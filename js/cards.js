export const cards = [
  {
    id: "A1_001",

    act: 1,

    title: "Une vidéo devient virale",

    text: "Une vidéo montrant Léa quitter le lycée en larmes circule sur TikTok.",

    source: "TikTok",

    image: "lea-video.jpg",

    tags: ["viral", "emotion"],

    keep: {
      stats: {
        viral: 5,
        curiosity: 1,
      },

      scores: {
        emotional: 2,
      },
    },

    discard: {
      stats: {
        curiosity: -1,
      },

      scores: {},
    },

    weight: 10,

    requirements: [],

    excludes: [],
  },
  {
    id: "A1_002",
    act: 1,
    title: "Une publication accuse Nathan",
    text: "Un compte Instagram affirme que Nathan serait responsable du mal-être de Léa.",
    source: "Instagram",
    tags: ["accusation"],
    keep: {
      stats: { curiosity: 2, influence: 1 },
      scores: { emotional: 1 },
    },
    discard: {
      stats: { curiosity: -1 },
      scores: {},
    },
  },
  {
id:"A1_003",
act:1,
title:"Un hashtag apparaît",
text:"#JusticePourLea commence à apparaître sur plusieurs réseaux.",
source:"X",
tags:["viral"],
keep:{
stats:{viral:3},
scores:{emotional:2}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_004",
act:1,
title:"Les commentaires s'enflamment",
text:"Sous la vidéo, des centaines de commentaires demandent des sanctions immédiates.",
source:"TikTok",
tags:["emotion"],
keep:{
stats:{viral:2},
scores:{emotional:2}
},
discard:{
stats:{truth:1},
scores:{critical:1}
}
},
{
id:"A1_005",
act:1,
title:"Le lycée réagit",
text:"La direction annonce qu'une enquête interne est en cours.",
source:"Communiqué du lycée",
tags:["official"],
keep:{
stats:{truth:3},
scores:{critical:1}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_006",
act:1,
title:"Une capture d'écran circule",
text:"Une conversation privée attribuée à Nathan est partagée en ligne.",
source:"Snapchat",
tags:["rumour"],
keep:{
stats:{curiosity:2},
scores:{emotional:1}
},
discard:{
stats:{truth:2},
scores:{critical:1}
}
},
{
id:"A1_007",
act:1,
title:"Des élèves témoignent",
text:"Plusieurs élèves racontent avoir vu une dispute entre Léa et Nathan.",
source:"Interview locale",
tags:["witness"],
keep:{
stats:{curiosity:2},
scores:{}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_008",
act:1,
title:"Une vidéo réaction",
text:"Un youtubeur commente l'affaire et désigne déjà un responsable.",
source:"YouTube",
tags:["opinion"],
keep:{
stats:{viral:4},
scores:{emotional:2}
},
discard:{
stats:{truth:1},
scores:{critical:1}
}
},
{
id:"A1_009",
act:1,
title:"Le compte de Léa disparaît",
text:"Son profil principal devient inaccessible pendant plusieurs heures.",
source:"Instagram",
tags:["mystery"],
keep:{
stats:{curiosity:3},
scores:{}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_010",
act:1,
title:"Des messages anonymes apparaissent",
text:"Plusieurs comptes récemment créés publient des insultes visant Léa.",
source:"Instagram",
tags:["harassment"],
keep:{
stats:{truth:1,curiosity:2},
scores:{critical:1}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_011",
act:1,
title:"Une exclusion se prépare ?",
text:"Une publication affirme que Nathan pourrait être exclu du lycée dès la semaine prochaine.",
source:"Compte Instagram anonyme",
tags:["rumeur","accusation"],
keep:{
stats:{curiosity:2,viral:2},
scores:{emotional:1}
},
discard:{
stats:{truth:1},
scores:{critical:1}
}
},
{
id:"A1_012",
act:1,
title:"Ce que l'on sait vraiment",
text:"Un article récapitule les faits confirmés et distingue clairement les rumeurs des informations vérifiées.",
source:"Le Courrier Local",
tags:["journalisme","fact-checking"],
keep:{
stats:{truth:4,expertise:2},
scores:{critical:2}
},
discard:{
stats:{truth:-1},
scores:{}
}
},
{
id:"A1_013",
act:1,
title:"Le témoignage d'une amie",
text:"Une amie de Léa raconte que celle-ci recevait déjà des messages désagréables avant que la vidéo ne devienne virale.",
source:"Interview vidéo",
tags:["témoignage"],
keep:{
stats:{curiosity:2,truth:1},
scores:{critical:1}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_014",
act:1,
title:"Et si on nous cachait quelque chose ?",
text:"Une vidéo affirme que certains médias ne montrent volontairement qu'une partie de l'histoire.",
source:"Chaîne vidéo indépendante",
tags:["complot","opinion"],
keep:{
stats:{curiosity:2},
scores:{conspiratorial:2}
},
discard:{
stats:{truth:1},
scores:{critical:1}
}
},
{
id:"A1_015",
act:1,
title:"Nathan répond",
text:"Dans une story, Nathan écrit : 'Vous ne savez pas ce qu'il s'est réellement passé.'",
source:"Instagram",
tags:["réaction","accusé"],
keep:{
stats:{curiosity:3},
scores:{}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_016",
act:1,
title:"Une compilation virale",
text:"Une vidéo rassemble les moments les plus choquants de l'affaire sur une musique dramatique.",
source:"TikTok",
tags:["viral","émotion"],
keep:{
stats:{viral:5},
scores:{emotional:2}
},
discard:{
stats:{truth:1},
scores:{critical:1}
}
},
{
id:"A1_017",
act:1,
title:"Rappel à la prudence",
text:"Un journaliste rappelle qu'aucune enquête officielle n'a encore rendu ses conclusions.",
source:"Chaîne d'information",
tags:["journalisme","prudence"],
keep:{
stats:{truth:3,expertise:2},
scores:{critical:2}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_018",
act:1,
title:"Une pétition circule",
text:"Plus de 8 000 personnes ont signé une pétition demandant l'exclusion immédiate de Nathan.",
source:"Plateforme de pétition",
tags:["mobilisation","viral"],
keep:{
stats:{viral:3,influence:2},
scores:{emotional:1}
},
discard:{
stats:{truth:1},
scores:{critical:1}
}
},
{
id:"A1_019",
act:1,
title:"Des centaines de notifications",
text:"Une capture d'écran montre que Léa reçoit des dizaines de messages insultants chaque heure.",
source:"Capture relayée par plusieurs comptes",
tags:["harcèlement"],
keep:{
stats:{truth:2,curiosity:2},
scores:{critical:1}
},
discard:{
stats:{},
scores:{}
}
},
{
id:"A1_020",
act:1,
title:"Une affaire qui dépasse le lycée",
text:"L'histoire est désormais relayée par des médias nationaux. Chacun semble avoir sa propre version des faits.",
source:"Revue de presse",
tags:["média","polarisation"],
keep:{
stats:{curiosity:3,expertise:1},
scores:{critical:1}
},
discard:{
stats:{},
scores:{}
}
}
];
