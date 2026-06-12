/* ================================================
   intro.js — Title → Cinematic → Profile → Game
   ================================================ */

const INTRO_SCENES = [
  {
    text: "Il y a quelques heures, une vidéo a commencé à circuler. Une lycéenne. Des larmes. Quelques secondes qui suffisaient à faire brûler les réseaux.",
    label: "Scène 01 / 04",
    imagePlaceholder: "./assets/images/scene1.png"
  },
  {
    text: "En quelques heures, des milliers de partages. Des accusations. Des pétitions. Chacun a son avis. Personne ne sait vraiment ce qu'il s'est passé.",
    label: "Scène 02 / 04",
    imagePlaceholder: "./assets/images/scene2.png"
  },
  {
    text: "Tu arrives dans ce chaos informationnel. À toi de naviguer : swipe pour garder ou ignorer chaque carte. Tes choix façonneront ta vision de l'histoire.",
    label: "Scène 03 / 04",
    imagePlaceholder: "./assets/images/scene3.png"
  },
  {
    text: "Ce que tu crois vrai dépendra de ce que tu auras choisi de lire. Et à la fin, le miroir se retourne.",
    label: "Scène 04 / 04",
    imagePlaceholder: "./assets/images/scene4.png"
  }
];

const PROFILES = [
  {
    id: "curious",
    icon: "🔍",
    name: "Le Curieux",
    desc: "Tu cliques sur tout. L'essentiel, le superflu, les rumeurs. La vérité est quelque part, tu en es sûr.",
    stats: {
      curiosity:  { label: "Curiosité",   value: 90 },
      truth:      { label: "Vérité",      value: 50 },
      expertise:  { label: "Expertise",   value: 30 },
      viral:      { label: "Viral",       value: 60 },
      influence:  { label: "Influence",   value: 40 }
    },
    initialStats: {
      curiosity: 80,
      truth: 50,
      expertise: 30,
      speed: 60,
      viral: 60,
      influence: 40
    }
  },
  {
    id: "expert",
    icon: "📚",
    name: "L'Expert",
    desc: "Tu ne partages que ce que tu peux vérifier. Lent, méthodique. Tu résistes à l'émotion mais tu rates parfois l'essentiel.",
    stats: {
      curiosity:  { label: "Curiosité",   value: 40 },
      truth:      { label: "Vérité",      value: 90 },
      expertise:  { label: "Expertise",   value: 85 },
      viral:      { label: "Viral",       value: 20 },
      influence:  { label: "Influence",   value: 50 }
    },
    initialStats: {
      curiosity: 40,
      truth: 85,
      expertise: 90,
      speed: 30,
      viral: 20,
      influence: 50
    }
  },
  {
    id: "influencer",
    icon: "📱",
    name: "L'Influenceur",
    desc: "La visibilité avant tout. Tu surfs sur les vagues d'indignation. Ton audience grandit — mais à quel prix ?",
    stats: {
      curiosity:  { label: "Curiosité",   value: 55 },
      truth:      { label: "Vérité",      value: 25 },
      expertise:  { label: "Expertise",   value: 20 },
      viral:      { label: "Viral",       value: 95 },
      influence:  { label: "Influence",   value: 90 }
    },
    initialStats: {
      curiosity: 55,
      truth: 25,
      expertise: 20,
      speed: 90,
      viral: 95,
      influence: 90
    }
  }
];

/* ── helpers ── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function fadeOutThen(el, cb) {
  el.classList.add('screen-fade-out');
  el.addEventListener('animationend', cb, { once: true });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TITLE SCREEN
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initTitle() {
  showScreen('titleScreen');
  document.getElementById('btnStart').onclick = () => {
    fadeOutThen(document.getElementById('titleScreen'), startCinematic);
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CINEMATIC
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let currentScene = 0;
let sceneTimeout = null;

function buildCinematicDOM() {
  const dots = document.querySelector('.cinematic-progress');
  const sceneLabel = document.querySelector('.cinematic-scene-label');
  const textEl = document.querySelector('.cinematic-text');
  const imageSlots = document.querySelectorAll('.cinematic-image-slot');

  dots.innerHTML = INTRO_SCENES.map((_, i) =>
    `<div class="cinematic-progress-dot" id="dot-${i}"></div>`
  ).join('');

  INTRO_SCENES.forEach((scene, i) => {
    if (imageSlots[i]) {
        console.log("Setting image for scene", i, scene.imagePlaceholder);
      imageSlots[i].querySelector('.cinematic-image-placeholder')
        .src = scene.imagePlaceholder;
    }
  });
}

function showScene(index) {
  if (index >= INTRO_SCENES.length) {
    fadeOutThen(document.getElementById('cinematicScreen'), showProfileScreen);
    return;
  }

  const scene = INTRO_SCENES[index];
  const textEl = document.querySelector('.cinematic-text');
  const imageSlots = document.querySelectorAll('.cinematic-image-slot');
  const sceneLabel = document.querySelector('.cinematic-scene-label');

  /* update dots */
  document.querySelectorAll('.cinematic-progress-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

  sceneLabel.textContent = scene.label;

  /* swap image */
  imageSlots.forEach((slot, i) => {
    slot.classList.toggle('visible', i === index);
  });

  /* fade text */
  textEl.classList.remove('visible');
  setTimeout(() => {
    textEl.textContent = scene.text;
    textEl.classList.add('visible');
  }, 300);

  /* auto-advance after 3.5 s */
  clearTimeout(sceneTimeout);
  sceneTimeout = setTimeout(() => {
    currentScene++;
    showScene(currentScene);
  }, 3500);
}

function startCinematic() {
  showScreen('cinematicScreen');
  buildCinematicDOM();
  currentScene = 0;

  /* click anywhere on cinematic to advance */
  document.getElementById('cinematicScreen').addEventListener('click', function onCinematicClick(e) {
    if (e.target.classList.contains('cinematic-skip')) return;
    clearTimeout(sceneTimeout);
    currentScene++;
    if (currentScene >= INTRO_SCENES.length) {
      document.getElementById('cinematicScreen').removeEventListener('click', onCinematicClick);
      fadeOutThen(document.getElementById('cinematicScreen'), showProfileScreen);
    } else {
      showScene(currentScene);
    }
  });

  document.querySelector('.cinematic-skip').onclick = (e) => {
    e.stopPropagation();
    clearTimeout(sceneTimeout);
    fadeOutThen(document.getElementById('cinematicScreen'), showProfileScreen);
  };

  showScene(0);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROFILE SCREEN
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let selectedProfile = null;

function buildProfileCard(profile) {
  const statBars = Object.entries(profile.stats).map(([key, s]) => `
    <div class="profile-stat-row">
      <span class="profile-stat-name">${s.label}</span>
      <div class="profile-stat-bar-track">
        <div class="profile-stat-bar-fill" style="width: ${s.value}%"></div>
      </div>
    </div>
  `).join('');

  return `
    <div class="profile-card" data-profile="${profile.id}">
      <span class="profile-card-icon">${profile.icon}</span>
      <div class="profile-card-name">${profile.name}</div>
      <div class="profile-card-desc">${profile.desc}</div>
      <div class="profile-card-stats">${statBars}</div>
    </div>
  `;
}

function showProfileScreen() {
  showScreen('profileScreen');

  const grid = document.querySelector('.profile-grid');
  grid.innerHTML = PROFILES.map(buildProfileCard).join('');

  const playBtn = document.getElementById('btnPlay');
  playBtn.disabled = true;

  grid.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedProfile = PROFILES.find(p => p.id === card.dataset.profile);
      playBtn.disabled = false;
    });
  });

  playBtn.onclick = () => {
    if (!selectedProfile) return;
    fadeOutThen(document.getElementById('profileScreen'), () => startGame(selectedProfile));
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LAUNCH GAME
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function startGame(profile) {
  /* hide all screens */
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  /* reveal game */
  document.getElementById('game').classList.add('active');
  /* dispatch event so game.js can pick up the profile */
  window.dispatchEvent(new CustomEvent('gameStart', { detail: profile }));
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', initTitle);