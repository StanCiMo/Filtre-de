/**
 * engine.js
 * Cœur logique du jeu — état, sélection des cartes, effets, scores, actes, endings.
 * Ne touche jamais au DOM : toute interaction UI reste dans game.js.
 */

import { cards } from './cards.js';
import { acts } from './acts.js';
import { endings } from './endings.js';

// ─── État global ──────────────────────────────────────────────────────────────

export const state = {

  // Jauges visibles dans le HUD (0–100)
  stats: {
    curiosity:  50,
    truth:      50,
    expertise:  50,
    speed:      50,
    viral:      50,
    influence:  50,
  },

  // Scores cachés qui orientent vers un ending
  scores: {
    emotional:     0,
    critical:      0,
    conspiratorial: 0,
  },

  // Progression
  currentAct:       1,
  cardsPlayedInAct: 0,
  playedCardIds:    [],   // historique des ids joués dans la partie
  currentCard:      null,
  gameOver:         false,
};

// ─── Sélection des cartes ─────────────────────────────────────────────────────

/**
 * Retourne les cartes éligibles pour l'acte courant :
 * - appartiennent à l'acte courant
 * - pas encore jouées
 * - requirements satisfaits (toutes les cartes listées ont été jouées)
 * - aucune carte de la liste excludes n'a été jouée
 */
function getEligibleCards() {
  return cards.filter(card => {
    if (card.act !== state.currentAct) return false;
    if (state.playedCardIds.includes(card.id)) return false;

    const reqsMet = !card.requirements?.length ||
      card.requirements.every(id => state.playedCardIds.includes(id));

    const notExcluded = !card.excludes?.length ||
      !card.excludes.some(id => state.playedCardIds.includes(id));

    return reqsMet && notExcluded;
  });
}

/**
 * Tire une carte au sort parmi les éligibles en tenant compte du champ `weight`.
 * Une carte sans `weight` vaut 1.
 * Retourne null si le pool est vide.
 */
function pickWeightedCard(pool) {
  if (!pool.length) return null;

  const totalWeight = pool.reduce((sum, c) => sum + (c.weight ?? 1), 0);
  let rand = Math.random() * totalWeight;

  for (const card of pool) {
    rand -= (card.weight ?? 1);
    if (rand <= 0) return card;
  }

  return pool[pool.length - 1]; // fallback
}

/**
 * Sélectionne et stocke la prochaine carte dans state.currentCard.
 * Retourne false si plus aucune carte n'est disponible pour l'acte.
 */
export function nextCard() {
  const pool = getEligibleCards();

  if (!pool.length) {
    // Toutes les cartes de l'acte ont été jouées — tenter de passer à l'acte suivant
    const advanced = advanceAct();
    if (!advanced) {
      triggerEnding();
      return false;
    }
    return nextCard(); // relancer sur le nouvel acte
  }

  state.currentCard = pickWeightedCard(pool);
  return true;
}

// ─── Application des effets ───────────────────────────────────────────────────

/**
 * Applique les effets de la carte courante selon la direction du swipe.
 * @param {'right'|'left'} dir  right = keep, left = discard
 */
export function applyEffect(dir) {
  const card = state.currentCard;
  if (!card) return;

  const effects = dir === 'right' ? card.keep : card.discard;

  // Mise à jour des stats (clampées entre 0 et 100)
  for (const [key, delta] of Object.entries(effects.stats ?? {})) {
    if (key in state.stats) {
      state.stats[key] = Math.max(0, Math.min(100, state.stats[key] + delta));
    }
  }

  // Mise à jour des scores cachés (non clampés — ils s'accumulent)
  for (const [key, delta] of Object.entries(effects.scores ?? {})) {
    if (key in state.scores) {
      state.scores[key] += delta;
    }
  }

  // Enregistrer la carte jouée
  state.playedCardIds.push(card.id);
  state.cardsPlayedInAct++;

  // Vérifier si l'acte est terminé selon le cardCount défini dans acts.js
  const actConfig = acts[state.currentAct];
  if (actConfig && state.cardsPlayedInAct >= actConfig.cardCount) {
    advanceAct();
  }

  // Vérifier les conditions de game over (une jauge à 0 ou 100)
  checkStatBounds();
}

// ─── Gestion des actes ────────────────────────────────────────────────────────

/**
 * Passe à l'acte suivant.
 * Retourne true si l'avancement a réussi, false si on est à la fin du jeu.
 */
function advanceAct() {
  const nextAct = state.currentAct + 1;

  if (!acts[nextAct]) {
    // Plus d'acte suivant → fin du jeu
    triggerEnding();
    return false;
  }

  state.currentAct = nextAct;
  state.cardsPlayedInAct = 0;
  return true;
}

// ─── Conditions de fin ────────────────────────────────────────────────────────

/**
 * Vérifie si une jauge a atteint ses limites (0 ou 100).
 * Déclenche un game over immédiat si c'est le cas.
 */
function checkStatBounds() {
  for (const [key, val] of Object.entries(state.stats)) {
    if (val <= 0 || val >= 100) {
      triggerEnding(`stat_overflow_${key}`);
      return;
    }
  }
}

/**
 * Détermine et déclenche l'ending approprié.
 * Si une clé est fournie (overflow de stat), elle prime.
 * Sinon on résout l'ending selon le score dominant.
 * @param {string|null} overrideKey
 */
export function triggerEnding(overrideKey = null) {
  state.gameOver = true;

  let endingKey;

  if (overrideKey) {
    endingKey = overrideKey;
  } else {
    // Ending déterminé par le score le plus élevé
    endingKey = Object.entries(state.scores)
      .sort(([, a], [, b]) => b - a)[0][0];
  }

  const ending = endings[endingKey] ?? endings['critical']; // fallback
  // game.js écoute cet événement pour afficher l'écran de fin
  document.dispatchEvent(new CustomEvent('game:ending', { detail: { ending, endingKey } }));
}

// ─── Utilitaires ──────────────────────────────────────────────────────────────

/**
 * Retourne la liste des deltas de stats pour la carte courante,
 * utile pour afficher les indicateurs avant le swipe.
 * @param {'right'|'left'} dir
 */
export function getPreviewEffects(dir) {
  const card = state.currentCard;
  if (!card) return {};
  return dir === 'right' ? (card.keep?.stats ?? {}) : (card.discard?.stats ?? {});
}

/**
 * Remet le jeu dans son état initial.
 */
export function resetGame() {
  state.stats       = { curiosity: 50, truth: 50, expertise: 50, speed: 50, viral: 50, influence: 50 };
  state.scores      = { emotional: 0, critical: 0, conspiratorial: 0 };
  state.currentAct       = 1;
  state.cardsPlayedInAct = 0;
  state.playedCardIds    = [];
  state.currentCard      = null;
  state.gameOver         = false;
}