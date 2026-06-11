// =============================================================================
// ACTE I — "LE BUZZ"
// Structure narrative en 3 phases :
//   Phase 1 (P1) : Déclencheur — l'emballement initial
//   Phase 2 (P2) : Carrefour — premières sources contradictoires
//   Phase 3 (P3) : Escalade — mob, pétition, contre-récit
//
// Logique des effets :
//   keep   = le joueur garde/partage la carte (la valide, l'amplifie)
//   discard = le joueur ignore/écarte la carte
//
// Tensions clés :
//   truth ↔ viral       : vérifier coûte du reach
//   expertise ↔ influence : sources sérieuses freinent le mob
//   emotional score ↔ critical score : oriente le profil final
//
// Effets forts (-5 à -10) sur les mauvais choix évidents
// Effets modérés (±2 à ±4) sur les choix ambigus
// =============================================================================

export const cards = [

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 1 — DÉCLENCHEUR (cartes A1_001 à A1_008)
  // L'emballement part de zéro. Ces cartes établissent le contexte
  // et forcent le joueur à choisir entre s'enflammer ou observer.
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "A1_001",
    act: 1,
    phase: 1,
    title: "Une vidéo devient virale",
    text: "Une vidéo montrant Léa quitter le lycée en larmes circule sur TikTok. Des milliers de vues en quelques heures.",
    source: "TikTok",
    image: "lea-video.jpg",
    tags: ["viral", "emotion", "declencheur"],
    keep: {
      stats: { viral: 6, influence: 2,truth: -2, curiosity: -1 },
      scores: { emotional: 3 }
    },
    discard: {
      stats: { truth: 2, curiosity: 1, viral: -6, influence: -2  },
      scores: { critical: 1 }
    },
    weight: 15,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_002",
    act: 1,
    phase: 1,
    title: "Le premier commentaire viral",
    text: "Un compte avec 80k abonnés commente : 'On sait tous ce qui s'est passé. Certains méritent ce qui leur arrive.' 12 000 likes en une heure.",
    source: "TikTok",
    tags: ["viral", "accusation", "emotion"],
    keep: {
      stats: { viral: 5, influence: 3,truth: -3,  },
      scores: { emotional: 3 }
    },
    discard: {
      stats: { truth: 3, viral: -5, influence: -3 },
      scores: { critical: 2 }
    },
    weight: 12,
    requirements: ["A1_001"],
    excludes: []
  },

  {
    id: "A1_003",
    act: 1,
    phase: 1,
    title: "Le compte de Léa disparaît",
    text: "Son profil Instagram devient inaccessible. Des centaines de messages demandent ce qui se passe. Personne ne sait si c'est elle qui a désactivé ou autre chose.",
    source: "Instagram",
    tags: ["mystery", "viral"],
    keep: {
      stats: { curiosity: 5, viral: 3,truth: -2 },
      scores: { emotional: 2 }
    },
    discard: {
      stats: { truth: 2,uriosity: -5, viral: -3 },
      scores: { critical: 1 }
    },
    weight: 12,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_004",
    act: 1,
    phase: 1,
    title: "Un hashtag naît",
    text: "#JusticePourLea apparaît spontanément sur X et TikTok. Des centaines de comptes l'adoptent sans connaître les faits.",
    source: "X / TikTok",
    tags: ["viral", "mobilisation"],
    keep: {
      stats: { viral: 7, influence: 4,truth: -2 },
      scores: { emotional: 3 },
    },
    discard: {
      stats: { truth: 2, curiosity: 1, viral: -7, influence: -4 },
      scores: { critical: 2 }
    },
    weight: 10,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_005",
    act: 1,
    phase: 1,
    title: "Une capture d'écran circule",
    text: "Une conversation privée attribuée à Nathan est partagée en masse. Impossible d'en vérifier l'authenticité. Le contexte manque totalement.",
    source: "Snapchat → Instagram → X",
    tags: ["rumeur", "accusation"],
    keep: {
      stats: { viral: 5, influence: 2, truth: -4, curiosity: -2 },
      scores: { emotional: 2, conspiratorial: 1 }
    },
    discard: {
      stats: { truth: 4, curiosity: 2 },
      scores: { critical: 3 }
    },
    weight: 10,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_006",
    act: 1,
    phase: 1,
    title: "Les commentaires s'enflamment",
    text: "Sous la vidéo, des centaines de messages exigent des sanctions immédiates. Plusieurs évoquent des actions directes contre Nathan.",
    source: "TikTok",
    tags: ["harassment", "emotion"],
    keep: {
      stats: { viral: 4, influence: 3,truth: -2 },
      scores: { emotional: 4 }
    },
    discard: {
      stats: { truth: 2,viral: -4, influence: -3 },
      scores: { critical: 2 }
    },
    weight: 9,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_007",
    act: 1,
    phase: 1,
    title: "Une vidéo réaction explosive",
    text: "Un youtubeur avec 500k abonnés sort une vidéo de 20 min désignant Nathan comme coupable. Ses sources ? La vidéo TikTok et 'ce qu'il a entendu dire'.",
    source: "YouTube",
    tags: ["opinion", "viral", "accusation"],
    keep: {
      stats: { viral: 8, influence: 5,  truth: -5, expertise: -2},
      scores: { emotional: 4 }
    },
    discard: {
      stats: { truth: 5, expertise: 2, viral: -8, influence: -5 },
      scores: { critical: 4 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_008",
    act: 1,
    phase: 1,
    title: "Le lycée communique",
    text: "La direction publie un bref communiqué : 'Une enquête interne est en cours. Nous demandons à chacun de respecter la présomption d'innocence.'",
    source: "Site officiel du lycée",
    tags: ["official", "prudence"],
    keep: {
      stats: { truth: 5, expertise: 3,viral: -3, influence: 2 },
      scores: { critical: 3 }
    },
    discard: {
      stats: { viral: 3, influence: 2, truth: -5, expertise: -3 },
      scores: { emotional: 1 }
    },
    weight: 10,
    requirements: [],
    excludes: []
  },


  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 2 — CARREFOUR (cartes A1_009 à A1_018)
  // Sources contradictoires. Chaque carte oppose une lecture émotionnelle
  // et une lecture factuelle. Les effets se durcissent.
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "A1_009",
    act: 1,
    phase: 2,
    title: "L'amie de Léa témoigne",
    text: "Une amie de Léa raconte en story : 'Elle recevait des messages violents depuis des semaines. Personne n'a rien fait.' Elle nomme Nathan directement.",
    source: "Instagram Stories",
    tags: ["temoignage", "accusation"],
    keep: {
      stats: { viral: 4, influence: 3, curiosity: 2,truth: -2, curiosity: -1 },
      scores: { emotional: 3 }
    },
    discard: {
      stats: { truth: 2, curiosity: 1,viral: -4, influence: -3, curiosity: -2 },
      scores: { critical: 1 }
    },
    weight: 10,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_010",
    act: 1,
    phase: 2,
    title: "Nathan répond",
    text: "Dans une story, Nathan publie : 'Vous ne savez pas ce qu'il s'est réellement passé. Je n'ai rien à me reprocher.' Story supprimée 2h après.",
    source: "Instagram",
    tags: ["reaction", "accuse"],
    keep: {
      stats: { curiosity: 4, viral: 3, truth: -1 },
      scores: { emotional: 1 }
    },
    discard: {
      stats: { truth: 1,curiosity: -4, viral: -3  },
      scores: { critical: 1 }
    },
    weight: 9,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_011",
    act: 1,
    phase: 2,
    title: "Un article démêle le vrai du faux",
    text: "Un journaliste local liste ce qui est confirmé (une dispute), probable (des tensions) et invérifiable (le reste). L'article est long, précis, peu partagé.",
    source: "Le Courrier Local",
    tags: ["journalisme", "fact-checking"],
    keep: {
      stats: { truth: 7, expertise: 4,viral: -4, influence: -3 },
      scores: { critical: 4 }
    },
    discard: {
      stats: { viral: 4, influence: 3,truth: -7, expertise: -4 },
      scores: { emotional: 2 }
    },
    weight: 9,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_012",
    act: 1,
    phase: 2,
    title: "Des comptes anonymes attaquent Léa",
    text: "Plusieurs profils créés dans les dernières 24h publient des messages insultants sur Léa. Stratégie coordonnée ou réaction spontanée ? Impossible à dire.",
    source: "Instagram / X",
    tags: ["harassment", "mystery"],
    keep: {
      stats: { curiosity: 4, viral: 3,truth: -3, expertise: -1 },
      scores: { emotional: 2 }
    },
    discard: {
      stats: { truth: 3, expertise: 1,curiosity: -4, viral: -3 },
      scores: { critical: 2 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_013",
    act: 1,
    phase: 2,
    title: "La théorie du complot",
    text: "Une chaîne YouTube affirme que 'les médias' ne montrent qu'une partie de l'histoire et que la direction du lycée 'couvre' quelque chose. Aucune source citée.",
    source: "Chaîne indépendante YouTube",
    tags: ["complot", "opinion"],
    keep: {
      stats: { curiosity: 3, viral: 4,truth: -5, expertise: -3 },
      scores: { conspiratorial: 5, emotional: 2 }
    },
    discard: {
      stats: { truth: 5, expertise: 3,curiosity: -3, viral: -4 },
      scores: { critical: 4 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_014",
    act: 1,
    phase: 2,
    title: "Une pétition de 10 000 signatures",
    text: "Une pétition demandant l'exclusion immédiate de Nathan atteint 10 000 signatures en 6h. Beaucoup de signataires avouent en commentaire ne pas connaître l'affaire.",
    source: "Plateforme de pétition",
    tags: ["mobilisation", "viral"],
    keep: {
      stats: { viral: 6, influence: 7,truth: -4, expertise: -2 },
      scores: { emotional: 5 }
    },
    discard: {
      stats: { truth: 4, expertise: 2,viral: -6, influence: -7 },
      scores: { critical: 4 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_015",
    act: 1,
    phase: 2,
    title: "Un journaliste rappelle à la prudence",
    text: "'Aucune enquête n'a rendu ses conclusions. Ce que vous partagez peut détruire une vie. Vérifiez.' Ce tweet d'un journaliste senior fait 200 retweets. La vidéo TikTok en a fait 80 000.",
    source: "X — journaliste accrédité",
    tags: ["journalisme", "prudence"],
    keep: {
      stats: { truth: 6, expertise: 4,viral: 5, influence: 4 },
      scores: { critical: 4 }
    },
    discard: {
      stats: { viral: -5, influence: -4 },
      scores: { emotional: 3 }
    },
    weight: 9,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_016",
    act: 1,
    phase: 2,
    title: "La compilation dramatique",
    text: "Quelqu'un monte une vidéo avec les moments les plus choquants de l'affaire, sur une musique triste. 2 millions de vues. Chaque scène est sortie de son contexte.",
    source: "TikTok",
    tags: ["viral", "emotion"],
    keep: {
      stats: { viral: 9, influence: 5, truth: -6, expertise: -2},
      scores: { emotional: 6 }
    },
    discard: {
      stats: { truth: 6, expertise: 2, viral: -9, influence: -5 },
      scores: { critical: 5 }
    },
    weight: 7,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_017",
    act: 1,
    phase: 2,
    title: "Des élèves du lycée témoignent",
    text: "Plusieurs élèves décrivent une dispute violente entre Léa et Nathan il y a trois semaines. Mais leurs récits divergent sur les détails essentiels.",
    source: "Interview locale",
    tags: ["temoignage"],
    keep: {
      stats: { curiosity: 4, truth: 2 },
      scores: { critical: 2 }
    },
    discard: {
      stats: {curiosity: -4, truth: -2},
      scores: {}
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_018",
    act: 1,
    phase: 2,
    title: "Léa réapparaît brièvement",
    text: "Léa publie un seul message avant de se déconnecter : 'S'il vous plaît, laissez-moi respirer. Vous ne savez pas tout.' Des milliers de réponses en quelques minutes.",
    source: "Instagram",
    tags: ["emotion", "mystery"],
    keep: {
      stats: { curiosity: 6, viral: 4,truth: -2 },
      scores: { emotional: 4 }
    },
    discard: {
      stats: { truth: 2, curiosity: -6, viral: -4 },
      scores: { critical: 1 }
    },
    weight: 10,
    requirements: [],
    excludes: []
  },


  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 3 — ESCALADE (cartes A1_019 à A1_030)
  // L'affaire sort du lycée. Médias nationaux, doxxing, contre-mob.
  // Les effets les plus durs de l'acte. Retour en arrière difficile.
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "A1_019",
    act: 1,
    phase: 3,
    title: "L'adresse de Nathan publiée",
    text: "Un compte publie ce qu'il prétend être l'adresse personnelle de Nathan. Des centaines de personnes partagent avant la suppression. Le post était faux, mais le mal est fait.",
    source: "X (post supprimé)",
    tags: ["doxxing", "harassment"],
    keep: {
      stats: { viral: 5, influence: 4, truth: -7, expertise: -4 },
      scores: { emotional: 5, conspiratorial: 2 }
    },
    discard: {
      stats: { truth: 7, expertise: 4, viral: -5, influence: -4 },
      scores: { critical: 6 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_020",
    act: 1,
    phase: 3,
    title: "Les médias nationaux s'emparent de l'affaire",
    text: "Deux chaînes nationales couvrent l'histoire. Chacune en donne une version différente selon son positionnement éditorial. Le sujet principal est perdu dans le bruit.",
    source: "Revue de presse nationale",
    tags: ["media", "polarisation"],
    keep: {
      stats: { curiosity: 4, viral: 5, expertise: 2, truth: -3,influence: 4 },
      scores: { critical: 2 }
    },
    discard: {
      stats: { truth: 3, curiosity: -4, viral: -5, influence: -4, expertise: -2 },
      scores: { critical: 1 }
    },
    weight: 9,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_021",
    act: 1,
    phase: 3,
    title: "Un ancien camarade prend la défense de Nathan",
    text: "Un ami de longue date de Nathan publie un thread : 'Je le connais depuis 10 ans. Ce n'est pas ce que vous croyez.' Le thread est noyé sous les insultes.",
    source: "X",
    tags: ["contre-recit", "temoignage"],
    keep: {
      stats: { truth: 1, curiosity: 2,viral: 3, influence: 2  },
      scores: { critical: 3 }
    },
    discard: {
      stats: { viral: -3, influence: -2,truth: -1, curiosity: -1},
      scores: { emotional: 2 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_022",
    act: 1,
    phase: 3,
    title: "L'employeur des parents de Nathan contacté",
    text: "Des militants appellent à contacter l'employeur des parents de Nathan pour 'faire pression'. Plusieurs dizaines de mails envoyés. L'enquête interne n'a pas encore rendu ses conclusions.",
    source: "Groupe Discord privé → X",
    tags: ["harassment", "mobilisation"],
    keep: {
      stats: { influence: 6, viral: 4,truth: -8, expertise: -5 },
      scores: { emotional: 6 }
    },
    discard: {
      stats: { truth: 8, expertise: 5,influence: -6, viral: -4 },
      scores: { critical: 7 }
    },
    weight: 7,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_023",
    act: 1,
    phase: 3,
    title: "Un professeur de droit intervient",
    text: "Une juriste explique en vidéo pourquoi partager des informations non vérifiées sur un mineur est légalement risqué. La vidéo est bien documentée. Elle récolte 800 vues contre 2M pour la compilation.",
    source: "YouTube — chaîne juridique",
    tags: ["journalisme", "expertise", "prudence"],
    keep: {
      stats: { truth: 8, expertise: 7,viral: -6, influence: -5 },
      scores: { critical: 6 }
    },
    discard: {
      stats: { viral: 6, influence: 5, truth: -8, expertise: -7 },
      scores: { emotional: 3 }
    },
    weight: 7,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_024",
    act: 1,
    phase: 3,
    title: "Une deuxième vidéo de Léa fuite",
    text: "Une vidéo filmée à son insu dans les couloirs du lycée est publiée. On ne l'entend pas bien. Des milliers de comptes l'interprètent comme ils veulent.",
    source: "TikTok (compte inconnu)",
    tags: ["viral", "mystery", "emotion"],
    keep: {
      stats: { viral: 8, curiosity: 5,truth: -5, expertise: -3 },
      scores: { emotional: 5 }
    },
    discard: {
      stats: { truth: 5, expertise: 3,viral: -8, curiosity: -5 },
      scores: { critical: 4 }
    },
    weight: 7,
    requirements: ["A1_001"],
    excludes: []
  },

  {
    id: "A1_025",
    act: 1,
    phase: 3,
    title: "Nathan supprime tous ses comptes",
    text: "Nathan disparaît des réseaux sociaux sans explication. Pour ses partisans, c'est la preuve d'une persécution. Pour ses accusateurs, c'est un aveu de culpabilité.",
    source: "Constat collectif",
    tags: ["mystery", "accuse"],
    keep: {
      stats: { curiosity: 5, viral: 4,truth: -3, curiosity: -2 },
      scores: { emotional: 3, conspiratorial: 2 }
    },
    discard: {
      stats: { truth: 3, curiosity: 2,curiosity: -5, viral: -4 },
      scores: { critical: 2 }
    },
    weight: 8,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_026",
    act: 1,
    phase: 3,
    title: "Une association anti-harcèlement interpelle",
    text: "Une association connue publie un communiqué : 'Cette affaire illustre comment les réseaux amplifient la souffrance au lieu de la résoudre. Arrêtez de partager.' Post ignoré par l'algorithme.",
    source: "Communiqué associatif",
    tags: ["official", "prudence"],
    keep: {
      stats: { truth: 5, expertise: 4,viral: -4, influence: -3 },
      scores: { critical: 4 }
    },
    discard: {
      stats: { viral: 4, influence: 3,truth: -5, expertise: -4 },
      scores: { emotional: 2 }
    },
    weight: 7,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_027",
    act: 1,
    phase: 3,
    title: "Le contre-mob",
    text: "Des comptes commencent à harceler les harceleurs de Nathan. Le mob se retourne. Insults, menaces — les mêmes mécanismes se répètent à l'envers.",
    source: "X / TikTok",
    tags: ["harassment", "viral", "polarisation"],
    keep: {
      stats: { viral: 6, influence: 4, truth: -6, expertise: -3 },
      scores: { emotional: 4, conspiratorial: 3 }
    },
    discard: {
      stats: { truth: 6, expertise: 3,viral: -6, influence: -4 },
      scores: { critical: 5 }
    },
    weight: 7,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_028",
    act: 1,
    phase: 3,
    title: "Un media spécialisé en fact-checking enquête",
    text: "Un media spécialisé passe 48h à vérifier chaque élément. Résultat : 3 faits confirmés, 12 invérifiables, 5 clairement faux. L'article est long. Très peu de partages.",
    source: "CheckNews",
    tags: ["fact-checking", "journalisme"],
    keep: {
      stats: { truth: 10, expertise: 6,viral: -8, influence: -6 },
      scores: { critical: 8 }
    },
    discard: {
      stats: { viral: 8, influence: 6, truth: -10, expertise: -6 },
      scores: { emotional: 4 }
    },
    weight: 6,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_029",
    act: 1,
    phase: 3,
    title: "L'affaire devient un symbole",
    text: "Des personnalités publiques s'approprient l'affaire pour défendre des causes plus larges. Léa et Nathan ne sont plus des gens réels — ils sont devenus des symboles.",
    source: "Revue de presse",
    tags: ["polarisation", "media"],
    keep: {
      stats: { influence: 6, viral: 5,truth: -5, expertise: -3 },
      scores: { emotional: 4, conspiratorial: 2 }
    },
    discard: {
      stats: { truth: 5, expertise: 3, influence: -6, viral: -5, },
      scores: { critical: 4 }
    },
    weight: 7,
    requirements: [],
    excludes: []
  },

  {
    id: "A1_030",
    act: 1,
    phase: 3,
    title: "Le silence de Léa",
    text: "Léa ne reparaît pas en ligne. Ses amis indiquent qu'elle va mal. L'affaire qui prétendait la défendre semble lui peser plus que tout. Personne ne semble remarquer l'ironie.",
    source: "Témoignage indirect",
    tags: ["emotion", "denouement"],
    keep: {
      stats: { truth: 6, curiosity: 3,viral: -3, influence: -2 },
      scores: { critical: 5 }
    },
    discard: {
      stats: { viral: 3, influence: 2,truth: -6, curiosity: -3 },
      scores: { emotional: 3 }
    },
    weight: 9,
    requirements: [],
    excludes: []
  }

];

// =============================================================================
// TABLEAU DE BORD DES EFFETS (pour référence)
//
// Effets maximum par stat sur l'ensemble de l'acte I :
//   viral     : keep max +9 (A1_016) / discard pénalité -8 (A1_028)
//   truth     : keep max +10 (A1_028) / pénalité discard rare
//   influence : keep max +7 (A1_014) / discard pénalité -6 (A1_028)
//   expertise : keep max +7 (A1_023) / discard pénalité -5 (A1_023)
//   curiosity : keep max +6 (A1_018)
//
// Scores de fin d'acte orientant le profil :
//   emotional    ≥ 30 → profil "émotionnel"    (acte II : mob, rumeurs)
//   critical     ≥ 30 → profil "analytique"    (acte II : enquête, sources)
//   conspiratorial ≥ 15 → profil "complotiste" (acte II : récits alternatifs)
// =============================================================================