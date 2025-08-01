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
}

function draw() {
  background(45, 90, 80, 125);

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
  if (!estEnPause && !debutClick) {
    debutClick = true;
    xdebut.push(mouseX);
    ydebut.push(mouseY);
    tdebut.push(count);
  }
}

function keyPressed() {
  if (key === ' ') {
    estEnPause = !estEnPause;
    if (estEnPause) {
      noLoop();
    } else {
      loop();
    }
  }

  if (key === 'f') {
    vitesseOnde = 30;
    longeurOnde = 350;
    couleurOnde = color(30, 100, 60, 255);
  }

  if (key === 'q') {
    vitesseOnde = 3;
    longeurOnde = 100;
    couleurOnde = color(random(40, 50), random(0, 20), random(10, 20), 255);
  }

  if (key === 's') {
    vitesseOnde = 1;
    longeurOnde = 50;
    couleurOnde = color(random(20, 150), 0, 100, 255);
  }
}
