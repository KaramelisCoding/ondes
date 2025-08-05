class RayonOnde {
  constructor(t_, v_, l_, couleur) {
    this.tDebut = t_;
    this.vOnde = v_;
    this.lOnde = l_;
    this.cOnde = couleur;
    this.r = 0;
    this.e = 0;
    this.cestFini = false;
    this.Lambda = Math.log(4) * this.vOnde / width;
  }

  update(count) {
    if (this.cestFini) return;

    let t = count - this.tDebut;
    this.r = Math.round(this.vOnde * t);

    if (this.vOnde === 30) { // indique que c'est l'onde Fast
      this.e = Math.round(90 * Math.exp(-this.Lambda * t));
    } else {
      this.e = Math.round(30 * Math.exp(-this.Lambda * t));
    }

    if (this.r > 3 * width) {
      this.cestFini = true;
    }
  }
}
