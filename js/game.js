/**
 * game.js
 * Couche UI — rendu des cartes, drag & drop, mise à jour du HUD.
 * Ne contient aucune logique métier : tout passe par engine.js.
 */

import { state, nextCard, applyEffect, getPreviewEffects, triggerEnding } from './engine.js';

// ─── Constantes ───────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 120;   // px avant de valider un swipe
const PREVIEW_THRESHOLD = 60;  // px avant d'afficher le feedback coloré

// ─── Rendu carte ──────────────────────────────────────────────────────────────

/**
 * Met à jour le DOM de la carte avec les données de state.currentCard.
 */
function renderCard() {
  const c = state.currentCard;
  if (!c) return;

  $('#cardTitle').text(c.title ?? '');
  $('#cardTop').text(c.text);
  $('#cardSource').text(c.source);

  // Image optionnelle
  if (c.image) {
    $('#cardImage').css('background-image', `url('/assets/images/${c.image}')`).show();
  } else {
    $('#cardImage').hide();
  }

  // Tags (source sociale, type de contenu…)
  const $tags = $('#cardTags').empty();
  (c.tags ?? []).forEach(tag => {
    $tags.append(`<span class="card-tag">${tag}</span>`);
  });

  // Réinitialiser la position de la carte (après swipe animé)
  $('#card').css({ transform: '', opacity: 1 });
  $('#cardPreviewLeft, #cardPreviewRight').css('opacity', 0);
  hideIndicators();
}

// ─── HUD — barres de stats ────────────────────────────────────────────────────

/**
 * Synchronise toutes les barres de jauges avec state.stats.
 */
function updateBars() {
  for (const key in state.stats) {
    $(`#${key}Bar`).css('--fill', state.stats[key] + '%');
  }
}

// ─── Indicateurs de preview (avant swipe) ────────────────────────────────────

/**
 * Allume les pastilles au-dessus des icônes dont les stats vont changer,
 * avec une couleur selon le signe (vert = hausse, rouge = baisse).
 * @param {'right'|'left'} dir
 */
function showIndicators(dir) {
  hideIndicators();
  const effects = getPreviewEffects(dir);

  for (const [key, delta] of Object.entries(effects)) {
    const $indicator = $(`#${key}Stat .indicator`);
    $indicator
      .css({
        opacity: 1,
        background: '#ffffffee' ,
      })
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
  } else if (diff < -PREVIEW_THRESHOLD) {
    $('#cardPreviewLeft').css('opacity', Math.min(1, (-diff - PREVIEW_THRESHOLD) / 80));
    $('#cardPreviewRight').css('opacity', 0);
    showIndicators('left');
  } else {
    $('#cardPreviewLeft, #cardPreviewRight').css('opacity', 0);
    hideIndicators();
  }
});

$(document).on('mouseup touchend', function (e) {
  if (!dragging) return;
  dragging = false;

  const endX = e.pageX ?? e.originalEvent.changedTouches?.[0]?.pageX ?? startX;
  const diff  = endX - startX;

  if (diff > SWIPE_THRESHOLD) {
    animateSwipe('right');
  } else if (diff < -SWIPE_THRESHOLD) {
    animateSwipe('left');
  } else {
    // Swipe trop court — remettre la carte en place
    $('#card').css('transform', '');
    $('#cardPreviewLeft, #cardPreviewRight').css('opacity', 0);
    hideIndicators();
  }
});

// ─── Animation de swipe ───────────────────────────────────────────────────────

/**
 * Fait voler la carte hors de l'écran, applique les effets, puis charge la suivante.
 * @param {'right'|'left'} dir
 */
function animateSwipe(dir) {
  const flyX = dir === 'right' ? '150vw' : '-150vw';

  $('#card').css({
    transition: 'transform 0.35s ease, opacity 0.35s ease',
    transform:  `translateX(${flyX}) rotate(${dir === 'right' ? 30 : -30}deg)`,
    opacity:    0,
  });

  setTimeout(() => {
    // Supprimer la transition avant de repositionner
    $('#card').css('transition', '');

    applyEffect(dir);
    updateBars();

    if (!state.gameOver) {
      const hasNext = nextCard();
      if (hasNext) renderCard();
    }
  }, 350);
}

// ─── Gestion des fins de jeu ──────────────────────────────────────────────────

document.addEventListener('game:ending', (e) => {
  const { ending, endingKey } = e.detail;
  showEndingScreen(ending, endingKey);
});

/**
 * Affiche l'écran de fin.
 * @param {object} ending  Objet ending depuis endings.js
 * @param {string} endingKey  Clé de l'ending ('critical', 'emotional', etc.)
 */
function showEndingScreen(ending, endingKey) {
  // Créer l'overlay s'il n'existe pas encore
  if (!$('#endingScreen').length) {
    $('body').append(`
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
          nextCard();
          renderCard();
        });
      });
    });
  }

  $('#endingTitle').text(ending.title ?? endingKey);
  $('#endingText').text(ending.text ?? '');

  // Récapitulatif des scores cachés
  const $stats = $('#endingStats').empty();
  for (const [key, val] of Object.entries(state.scores)) {
    $stats.append(`<div class="ending-score"><span>${key}</span><span>${val}</span></div>`);
  }

  $('#endingScreen').fadeIn(400);
}

// ─── Initialisation ───────────────────────────────────────────────────────────

$(document).ready(() => {
  updateBars();

  const hasCard = nextCard();
  if (hasCard) {
    renderCard();
  } else {
    triggerEnding();
  }
});