import { cards } from './cards.js';

let state = {
  stats: {
    curiosity: 100,
    truth: 100,
    expertise: 100,
    speed: 100,
    viral: 100,
    influence: 100
  },
  currentCard: null
};

/* ── Initialisation du profil ── */
window.addEventListener('gameStart', (e) => {
  const profile = e.detail;
  if (profile && profile.initialStats) {
    for (let k in profile.initialStats) {
      if (state.stats.hasOwnProperty(k)) {
        state.stats[k] = profile.initialStats[k];
      }
    }
  }
  updateBars();
  nextCard();
});

/* ── Indicators ── */
function showIndicators(card) {
  if (!card || !card.keep || !card.keep.stats) return;
  for (let k in card.keep.stats) {
    $("#" + k + "Stat .indicator").css("opacity", 1);
  }
}

function hideIndicators() {
  $(".indicator").css("opacity", 0);
}

/* ── Next card ── */
function nextCard() {
  state.currentCard = cards[Math.floor(Math.random() * cards.length)];
  renderCard();
}

/* ── Render card ── */
function renderCard() {
  let c = state.currentCard;
  $("#cardTop").text(c.text);
  $("#cardSource").text(c.source);
}

/* ── Update stat bars ── */
function updateBars() {
  for (let k in state.stats) {
    $("#" + k + "Bar").css("--fill", state.stats[k] + "%");
  }
}

/* ── Apply effect ── */
function applyEffect(dir) {
  let c = state.currentCard;
  const effectStats = dir === "right" ? c.keep.stats : c.discard.stats;
  for (let k in effectStats) {
    let value = effectStats[k];
    state.stats[k] = Math.max(0, Math.min(100, state.stats[k] + value));
  }
  updateBars();
  nextCard();
}

/* ── Drag system (Reigns style) ── */
let dragging = false;
let startX = 0;

$("#card").on("mousedown", function (e) {
  dragging = true;
  startX = e.pageX;
  showIndicators(state.currentCard);
});

$(document).on("mousemove", function (e) {
  if (!dragging) return;
  let diff = e.pageX - startX;
  $("#card").css("transform", `translateX(${diff}px) rotate(${diff / 20}deg)`);
  if (diff > 100) {
    $("#cardPreviewRight").css("opacity", 1);
    $("#cardPreviewLeft").css("opacity", 0);
  } else if (diff < -100) {
    $("#cardPreviewLeft").css("opacity", 1);
    $("#cardPreviewRight").css("opacity", 0);
  } else {
    $("#cardPreviewLeft, #cardPreviewRight").css("opacity", 0);
  }
});

$(document).on("mouseup", function (e) {
  if (!dragging) return;
  let diff = e.pageX - startX;
  $("#card").css("transform", "");
  $("#cardPreviewLeft, #cardPreviewRight").css("opacity", 0);
  if (diff > 120) {
    applyEffect("right");
  } else if (diff < -120) {
    applyEffect("left");
  }
  hideIndicators();
  dragging = false;
});