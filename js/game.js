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

/* CARDS */
/* const cards = [
  {
    text: "Une vidéo virale accuse la centrale.",
    source: "TikTok / Influenceur X",
    image: "",
    effect: { viral: +10, truth: -5 },
  },
  {
    text: "Article scientifique détaillé.",
    source: "Journal académique",
    image: "",
    effect: { expertise: +8, truth: +5 },
  }
]; */
function showIndicators(card) {
  if (!card || !card.keep || !card.keep.stats) return;

  for (let k in card.keep.stats) {
    $("#" + k + "Stat .indicator").css("opacity", 1);
  }
}

function hideIndicators() {
  $(".indicator").css("opacity", 0);
}
/* INIT */
function nextCard() {
  state.currentCard = cards[Math.floor(Math.random()*cards.length)];
  renderCard();
}

/* RENDER */
function renderCard() {
  let c = state.currentCard;

  $("#cardTop").text(c.text);
  $("#cardSource").text(c.source);
}

/* UPDATE STATS UI */
function updateBars() {
  for (let k in state.stats) {
$("#" + k + "Bar").css("--fill", state.stats[k] + "%");  }
}

/* APPLY EFFECT */
function applyEffect(dir) {
  let c = state.currentCard;
  for (let k in c.keep.stats) {
    let value = c.keep.stats[k];
    console.log(value)
    if (dir === "left") value = -value;

    state.stats[k] = Math.max(0, Math.min(100, state.stats[k] + value));
  }

  updateBars();
  nextCard();
}

/* DRAG SYSTEM (REIGNS STYLE) */
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

  $("#card").css("transform", `translateX(${diff}px) rotate(${diff/20}deg)`);

  if (diff > 100) {
    $("#cardPreviewRight").css("opacity", 1);
  } else if (diff < -100) {
    $("#cardPreviewLeft").css("opacity", 1);
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
    applyEffect("right"); // keep
  } else if (diff < -120) {
    applyEffect("left"); // discard
  }
  hideIndicators();
  dragging = false;
});

/* START */
$(document).ready(function () {
  updateBars();
  nextCard();
});