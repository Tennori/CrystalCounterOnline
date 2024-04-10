let particles = [];
let particleCountMin = 5;
let particleCountMax = 10;
let minInitialSize = 2;
let maxInitialSize = 10;
let emitterY = 800 + 50;
let emitterSizeY = 30; // エミッターのYサイズ
let minTurbulence = 0.1;
let maxTurbulence = 0.3;
let minAlpha = 200;
let maxAlpha = 255;
let minLifespan = 100;
let maxLifespan = 200;
let blurStrength = 1; // ブラーの強度 重いのでオミットした

let emitterSizeX; // エミッターのXサイズ

function setup() {
  // キャンバスをウィンドウのサイズに合わせる
  let canvas = createCanvas(windowWidth, windowHeight, P2D); // P2DでRGBAモードを使用
  emitterSizeX = windowWidth; // エミッターのXサイズをウィンドウの幅に合わせる
  // 背景を透明にする
  background(0, 0); 
  canvas.parent('canvas');
}

function draw() {
  clear(); // 毎フレームキャンバスをクリアする

  // 新しいパーティクルを追加
  let particleCount = int(random(particleCountMin, particleCountMax));
  for (let i = 0; i < particleCount; i++) {
    let initialSize = random(minInitialSize, maxInitialSize);
    let p = new Particle(
      random(emitterSizeX) ,// エミッターのX座標
      random(emitterY - emitterSizeY / 2, emitterY + emitterSizeY / 2), // エミッターのY座標
      random(-1, 1), // X軸速度
      random(-5, -1), // Y軸速度
      initialSize, // 初期サイズ
      random(minTurbulence, maxTurbulence), // タービュランスの強度
      random(minAlpha, maxAlpha), // 初期透明度
      random(minLifespan, maxLifespan) // 初期寿命
    );
    particles.push(p);
  }

  // パーティクルを更新して描画
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1); // 終了したパーティクルを削除
    }
  }

  // ブラーエフェクトをかける
  //filter(BLUR, blurStrength); // ブラーの強度を変数で指定
}

function windowResized() {
  // ウィンドウのサイズが変更されたときに呼び出される関数
  resizeCanvas(windowWidth, windowHeight);
  emitterSizeX = windowWidth; // エミッターのXサイズをウィンドウの幅に合わせる
}

class Particle {
  constructor(x, y, xspeed, yspeed, initialSize, turbulence, alpha, lifespan) {
    this.pos = createVector(x, y);
    this.vel = createVector(xspeed, yspeed);
    this.acc = createVector(0, -0.1);
    this.initialSize = initialSize;
    this.size = this.initialSize;
    this.turbulence = turbulence;
    this.offsetX = random(1000);
    this.offsetY = random(1000);
    this.alpha = alpha;
    this.lifespan = lifespan;
  }

  update() {
    // タービュランスを加える
    let turbulenceX = map(noise(this.offsetX), 0, 1, -this.turbulence, this.turbulence);
    let turbulenceY = map(noise(this.offsetY), 0, 1, -this.turbulence, this.turbulence);
    this.vel.add(turbulenceX, turbulenceY);
    this.offsetX += 0.01;
    this.offsetY += 0.01;

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.size -= 0.1; // パーティクルが寿命に向かうにつれて小さくなる
    this.lifespan -= 1; // パーティクルの寿命を減少させる
  }

  show() {
    let r = map(this.lifespan, 0, maxLifespan, 255, 255);
    let g = map(this.lifespan, 0, maxLifespan, 165, 50); // オレンジを強めに
    let b = 0;
    noStroke();
    blendMode(ADD); // 加算ブレンドモードを適用
    fill(r, g, b, this.alpha);
    let diameter = this.size * 0.75;
    ellipse(this.pos.x, this.pos.y, diameter, diameter); // パーティクルの大きさを変数に変更
    blendMode(BLEND); // 元のブレンドモードに戻す
  }

  finished() {
    return this.lifespan < 0;
  }
}
