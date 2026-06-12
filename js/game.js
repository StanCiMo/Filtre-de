/**
 * game.js
 * Couche UI — rendu des cartes, drag & drop, mise à jour du HUD.
 * Ne contient aucune logique métier : tout passe par engine.js.
 */

import { state, nextCard, applyEffect, getPreviewEffects, triggerEnding } from './engine.js';

// ─── Constantes ───────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD   = 120;  // px avant de valider un swipe
const PREVIEW_THRESHOLD = 60;   // px avant d'afficher le feedback coloré

// ─── Horloge de la barre de statut ───────────────────────────────────────────

function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const el   = document.getElementById('statusTime');
  if (el) el.textContent = `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 30_000);

// ─── Rendu carte ──────────────────────────────────────────────────────────────

function renderCard() {
  const c = state.currentCard;
  if (!c) return;

  $('#cardTitle').text(c.title ?? '');
  $('#cardTop').text(c.text);
  $('#cardSource').text(c.source);

  if (c.image) {
    $('#cardImage').css('background-image', `url('/assets/images/${c.image}')`).show();
  } else {
    $('#cardImage').hide();
  }

  const $tags = $('#cardTags').empty();
  (c.tags ?? []).forEach(tag => {
    $tags.append(`<span class="card-tag">${tag}</span>`);
  });

  // Réinitialiser la position
  $('#card').css({ transform: '', opacity: 1 });
  $('#cardPreviewLeft, #cardPreviewRight').css('opacity', 0);
  hideIndicators();
}

// ─── HUD — barres de stats ────────────────────────────────────────────────────

function updateBars() {
  for (const key in state.stats) {
    const val = state.stats[key];
    $(`#${key}Bar`).css('--fill', val + '%');

    // Alerte visuelle si la jauge approche des limites
    const $stat = $(`#${key}Stat`);
    if (val <= 20 || val >= 80) {
      $stat.addClass('critical');
    } else {
      $stat.removeClass('critical');
    }
  }
}

// ─── Badge d'acte ─────────────────────────────────────────────────────────────

function updateActBadge() {
  const actNames = { 1: 'Le Buzz', 2: 'Les Explications' };
  $('#actLabel').text(`Acte ${state.currentAct}`);
  $('#actName').text(actNames[state.currentAct] ?? '');
}

// ─── Indicateurs de preview ───────────────────────────────────────────────────

function showIndicators(dir) {
  hideIndicators();
  const effects = getPreviewEffects(dir);

  for (const [key, delta] of Object.entries(effects)) {
    const $indicator = $(`#${key}Stat .indicator`);
    $indicator
      .css({ opacity: 1, background: delta > 0 ? '#4ade80' : '#f43f5e' })
      .attr('title', (delta > 0 ? '+' : '') + delta);
  }
}

function hideIndicators() {
  $('.indicator').css('opacity', 0);
}

// ─── Swipe — drag & drop ─────────────────────────────────────────────────────

let dragging = false;
let startX   = 0;

$('#card').on('mousedown touchstart', function (e) {
  if (state.gameOver) return;
  dragging = true;
  startX   = e.pageX ?? e.originalEvent.touches[0].pageX;
});

$(document).on('mousemove touchmove', function (e) {
  if (!dragging) return;

  const currentX = e.pageX ?? e.originalEvent.touches[0].pageX;
  const diff     = currentX - startX;

  $('#card').css('transform', `translateX(${diff}px) rotate(${diff / 20}deg)`);

  if (diff > PREVIEW_THRESHOLD) {
    $('#cardPreviewRight').css('opacity', Math.min(1, (diff - PREVIEW_THRESHOLD) / 80));
    $('#cardPreviewLeft').css('opacity', 0);
    showIndicators('right');
    $('body').addClass('swiping-right').removeClass('swiping-left');
    $('#hintRight').css('opacity', 1);
    $('#hintLeft').css('opacity', 0.5);
  } else if (diff < -PREVIEW_THRESHOLD) {
    $('#cardPreviewLeft').css('opacity', Math.min(1, (-diff - PREVIEW_THRESHOLD) / 80));
    $('#cardPreviewRight').css('opacity', 0);
    showIndicators('left');
    $('body').addClass('swiping-left').removeClass('swiping-right');
    $('#hintLeft').css('opacity', 1);
    $('#hintRight').css('opacity', 0.5);
  } else {
    $('#cardPreviewLeft, #cardPreviewRight').css('opacity', 0);
    hideIndicators();
    $('body').removeClass('swiping-left swiping-right');
    $('#hintLeft, #hintRight').css('opacity', 0.5);
  }
});

$(document).on('mouseup touchend', function (e) {
  if (!dragging) return;
  dragging = false;
  $('body').removeClass('swiping-left swiping-right');

  const endX = e.pageX ?? e.originalEvent.changedTouches?.[0]?.pageX ?? startX;
  const diff  = endX - startX;

  if (diff > SWIPE_THRESHOLD) {
    animateSwipe('right');
  } else if (diff < -SWIPE_THRESHOLD) {
    animateSwipe('left');
  } else {
    $('#card').css('transform', '');
    $('#cardPreviewLeft, #cardPreviewRight').css('opacity', 0);
    $('#hintLeft, #hintRight').css('opacity', 0.5);
    hideIndicators();
  }
});

// ─── Animation de swipe ───────────────────────────────────────────────────────

function animateSwipe(dir) {
  const flyX = dir === 'right' ? '150vw' : '-150vw';

  $('#card').css({
    transition: 'transform 0.35s ease, opacity 0.35s ease',
    transform:  `translateX(${flyX}) rotate(${dir === 'right' ? 30 : -30}deg)`,
    opacity:    0,
  });

  setTimeout(() => {
    $('#card').css('transition', '');

    applyEffect(dir);
    updateBars();
    updateActBadge();

    if (!state.gameOver) {
      const hasNext = nextCard();
      if (hasNext) renderCard();
    }
  }, 350);
}

// ─── Écran de fin ─────────────────────────────────────────────────────────────

document.addEventListener('game:ending', (e) => {
  const { ending, endingKey } = e.detail;
  showEndingScreen(ending, endingKey);
});

function showEndingScreen(ending, endingKey) {
  // L'écran de fin est ancré dans #phoneScreen pour rester dans le cadre
  const $target = $('#phoneScreen');

  if (!$('#endingScreen').length) {
    $target.append(`
      <div id="endingScreen">
        <div id="endingContent">
          <h1 id="endingTitle"></h1>
          <p id="endingText"></p>
          <div id="endingStats"></div>
          <button id="endingRestart">Rejouer</button>
        </div>
      </div>
    `);

    $('#endingRestart').on('click', () => {
      $('#endingScreen').fadeOut(300, () => {
        import('./engine.js').then(({ resetGame }) => {
          resetGame();
          updateBars();
          updateActBadge();
          nextCard();
          renderCard();
        });
      });
    });
  }

  // Couleur d'accent de l'ending
  if (ending.color) {
    $('#endingTitle').css('color', ending.color);
  }

  $('#endingTitle').text(ending.title ?? endingKey);
  $('#endingText').text(ending.text ?? '');

  const $stats = $('#endingStats').empty();
  for (const [key, val] of Object.entries(state.scores)) {
    $stats.append(`<div class="ending-score"><span>${key}</span><span>${val}</span></div>`);
  }

  $('#endingScreen').css('display', 'flex').hide().fadeIn(400);
}

// ─── Initialisation ───────────────────────────────────────────────────────────

$(document).ready(() => {
  updateBars();
  updateActBadge();

  const hasCard = nextCard();
  if (hasCard) {
    renderCard();
  } else {
    triggerEnding();
  }
});