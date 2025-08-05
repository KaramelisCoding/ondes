let debutClick;
let rayon = [];
let xdebut = [];
let ydebut = [];
let tdebut = [];

let longeurOnde;
let vitesseOnde;
let couleurOnde;
let count;

let estEnPause;
let tDePause;


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  noFill();

  debutClick = false;
  longeurOnde = 150;
  vitesseOnde = 3;
  couleurOnde = color(random(40, 50), random(0, 20), random(10, 20), 255);
  count = 0;

  estEnPause = false;
  tDePause = 0;

  // 👇 Appel de la fonction pour activer les boutons

  setupButtons();

}

function draw() {
  background(45, 90, 80, 40);

  if (debutClick && tdebut.length > 0) {
    let index = tdebut.length - 1;
    rayon.push(new RayonOnde(tdebut[index], vitesseOnde, longeurOnde, couleurOnde));
    debutClick = false;
  }

  count++;

  for (let i = 0; i < rayon.length; i++) {
    let r = rayon[i];
    r.update(count);
    stroke(r.cOnde);
    strokeWeight(r.e);
    ellipse(xdebut[i], ydebut[i], r.r, r.r);

    let ecart = Math.round((longeurOnde / vitesseOnde) * 0.0012 * 1000);

    if (ecart <= (count - tdebut[i])) {
      strokeWeight(Math.round(0.8 * r.e));
      ellipse(xdebut[i], ydebut[i], r.r - r.lOnde, r.r - r.lOnde);
    }
    if (2 * ecart <= (count - tdebut[i])) {
      strokeWeight(Math.round(0.6 * r.e));
      ellipse(xdebut[i], ydebut[i], r.r - 2 * r.lOnde, r.r - 2 * r.lOnde);
    }
    if (3 * ecart <= (count - tdebut[i])) {
      strokeWeight(Math.round(0.3 * r.e));
      ellipse(xdebut[i], ydebut[i], r.r - 3 * r.lOnde, r.r - 3 * r.lOnde);
    }
    if (4 * ecart <= (count - tdebut[i])) {
      strokeWeight(Math.round(0.1 * r.e));
      ellipse(xdebut[i], ydebut[i], r.r - 4 * r.lOnde, r.r - 4 * r.lOnde);
    }
    if (5 * ecart <= (count - tdebut[i])) {
      strokeWeight(Math.round(0.1 * r.e));
      ellipse(xdebut[i], ydebut[i], r.r - 5 * r.lOnde, r.r - 5 * r.lOnde);
    }
    if (6 * ecart <= (count - tdebut[i])) {
      strokeWeight(Math.round(0.1 * r.e));
      ellipse(xdebut[i], ydebut[i], r.r - 6 * r.lOnde, r.r - 6 * r.lOnde);
    }
  }

  // Nettoyage des ondes terminées
  for (let i = rayon.length - 1; i >= 0; i--) {
    if (rayon[i].cestFini) {
      rayon.splice(i, 1);
      xdebut.splice(i, 1);
      ydebut.splice(i, 1);
      tdebut.splice(i, 1);
    }
  }
}

function mousePressed() {

// en écoutant avec "target" où est la souris on pose la condition que si target égal un des boutons on arrête l'efffet souri
   const target = document.elementFromPoint(mouseX, mouseY);
  if (target && (target.classList.contains('waveButton') || target.id === 'startButton'|| target.id === 'freezeButton')) {
    return;
  }


  if (!estEnPause && !debutClick) {
    debutClick = true;
    xdebut.push(mouseX);
    ydebut.push(mouseY);
    tdebut.push(count);
  }
}

// LES BOUTONS ET LEURS EFFETS 
function setupButtons() {
    // Initialisation des variables pour les boutons S, Q et F (Récupération des éléments HTML des boutons S, Q et F)
  const btnS = document.getElementById('btnS');
  const btnQ = document.getElementById('btnQ');
  const btnF = document.getElementById('btnF');
  const message = document.getElementById('waveMessage');

    // on prépare le clic en définissant aussi une fonction pour afficher un message
   function afficherMessage(text, bouton) {
    message.textContent = text;

    // Calcule la position verticale du bouton cliqué
    const rect = bouton.getBoundingClientRect();
    const y = rect.top + window.scrollY;

    message.style.top = `${y}px`;
   }

    // J'ecoute des boutons S, Q et F :et si il est cliqué, je lui attribue des valeurs pour leur onde
    // et j'affiche un message
  btnS.addEventListener('click', () => {
    vitesseOnde = 1;
    longeurOnde = 50;
    couleurOnde = color(0, 0, 100, 255);
    afficherMessage('SLOW wave activated', btnS);
  });

 // Bouton Q
  btnQ.addEventListener('click', () => {
    vitesseOnde = 3;
    longeurOnde = 100;
    couleurOnde = color(random(40, 50), random(0, 20), random(10, 20), 255);
    afficherMessage('QUIET wave activated', btnQ);
  });

  // Bouton F
  btnF.addEventListener('click', () => {
    vitesseOnde = 30;
    longeurOnde = 350;
    couleurOnde = color(30, 100, 60, 255);
    afficherMessage('FAST wave activated', btnF);
  });

   // Bouton FREEZE
  const freezeButton = document.getElementById('freezeButton');

  freezeButton.addEventListener('click', (e) => {
   
  estEnPause = !estEnPause;

  if (estEnPause) {
    noLoop();
    freezeButton.textContent = 'Resume';
  } else {
    loop();
    freezeButton.textContent = 'Freeze';
  }
});

    // BOUTON START
    const startButton = document.getElementById('startButton');
    const infoPanel = document.getElementById('infoPanel');

    console.log("🎯 Bouton Start détecté !");


  startButton.addEventListener('click', () => {
  console.log('🎯 Bouton Start cliqué'); // Ajoute cette ligne
  const isVisible = infoPanel.classList.contains('visible');

  if (isVisible) {
    infoPanel.classList.remove('visible');
   startButton.textContent = 'Info';

  } else {
    infoPanel.style.display = 'block';
    requestAnimationFrame(() => infoPanel.classList.add('visible'));
    startButton.textContent = 'Hide Info';
  }
});

  

}

