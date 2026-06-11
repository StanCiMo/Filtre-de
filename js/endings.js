/**
 * endings.js
 * Définition des fins de partie.
 *
 * Les endings principaux correspondent aux scores cachés accumulés pendant la partie :
 *   - critical       → le joueur a privilégié la vérification, le recul, la rigueur
 *   - emotional      → le joueur a surfé sur l'émotion et l'empathie
 *   - conspiratorial → le joueur a glissé vers les théories du complot
 *
 * Des endings secondaires peuvent être déclenchés par un overflow de stat (jauge à 0 ou 100).
 */

export const endings = {

  // ── Ending principal : pensée critique ────────────────────────────────────
  critical: {
    title: 'L\'Enquêteur',
    text:  `Vous avez résisté au bruit. Là où la foule voyait des coupables, vous avez cherché des preuves.
            Votre fil d'actualité ne ressemble plus à celui des autres — et c'est peut-être votre plus grande victoire.
            Léa et Nathan ont eu droit à quelque chose de rare : la présomption d'innocence.`,
    color: '#4a90d9',
  },

  // ── Ending principal : dérive émotionnelle ────────────────────────────────
  emotional: {
    title: 'Le Tribunal des sentiments',
    text:  `Vous avez ressenti avant de réfléchir. Chaque vidéo, chaque témoignage a trouvé un écho en vous.
            La cause semblait juste — et peut-être l'était-elle. Mais avez-vous vraiment cherché à savoir,
            ou avez-vous surtout cherché à ressentir ?`,
    color: '#e07b5a',
  },

  // ── Ending principal : dérive complotiste ─────────────────────────────────
  conspiratorial: {
    title: 'Le Fil invisible',
    text:  `Derrière chaque silence, vous avez vu un mensonge. Derrière chaque version officielle, une manipulation.
            Peut-être aviez-vous raison sur certains points. Mais à force de tout remettre en cause,
            vous n'avez plus cru personne — pas même les faits.`,
    color: '#8b6abf',
  },

  // ── Endings de stat overflow ──────────────────────────────────────────────
  stat_overflow_viral: {
    title: 'Noyé dans le buzz',
    text:  `Votre fil est devenu un torrent. L'affaire de Léa a englouti tout le reste.
            Vous avez alimenté la machine sans jamais pouvoir l'arrêter.`,
    color: '#f0b429',
  },

  stat_overflow_truth: {
    title: 'Vérité absolue',
    text:  `Vous avez tellement cherché la vérité que vous avez fini par croire la tenir.
            Mais une vérité sans doute est souvent une certitude prématurée.`,
    color: '#48bb78',
  },

  stat_overflow_curiosity: {
    title: 'Insatiable',
    text:  `Chaque réponse ouvrait dix nouvelles questions. Vous avez tout cliqué, tout lu, tout partagé.
            L'affaire vous a absorbé — au détriment de tout le reste.`,
    color: '#ed8936',
  },

  stat_overflow_influence: {
    title: 'Leader d\'opinion',
    text:  `Vos réactions ont façonné celles des autres. Sans le vouloir, vous êtes devenu
            une référence dans ce chaos. Avec le pouvoir vient la responsabilité.`,
    color: '#9f7aea',
  },

  stat_overflow_expertise: {
    title: 'L\'Expert solitaire',
    text:  `Vous saviez trop pour vous taire, pas assez pour convaincre.
            Votre expertise n'a touché que ceux qui voulaient déjà l'entendre.`,
    color: '#2b6cb0',
  },

  stat_overflow_speed: {
    title: 'Premier à tout prix',
    text:  `Vous avez tout partagé en temps réel — parfois avant même de savoir si c'était vrai.
            Dans la course à l'info, la vitesse a parfois primé sur la justesse.`,
    color: '#dd6b20',
  },

};