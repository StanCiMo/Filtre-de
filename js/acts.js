/**
 * acts.js
 * Définition des actes du jeu.
 * cardCount : nombre de cartes à jouer avant de passer à l'acte suivant.
 */

export const acts = {

  1: {
    name:      'Le buzz',
    cardCount: 10,   // sur 20 cartes dispo — on n'en joue que 10 par partie pour garder de la variété
  },

  2: {
    name:      'Les explications',
    cardCount: 10,
  },

};