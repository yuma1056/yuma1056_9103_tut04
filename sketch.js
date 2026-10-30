
let grass = [];
const MAX_GRASS = 300;
let canva;

function setup() {
  let canvasW = windowWidth * 0.5;
  let canvasH = windowHeight * 0.5;

  canva = createCanvas(canvasW, canvasH);

  centerCanvas();
  setupAudio();
}


function centerCanvas() {
  canva.position(0, 0);
}

//create the grass
function draw() {
  background(230);

  let volume = getVolume();

  updateAudio();
  updateGrass(volume);
  drawGrass();

  fill(0);
  noStroke();
  textSize(16);

}



 // Adjust the number of vines according to the volume
function updateGrass(volume) {
  let targetAmount = floor(map(volume, 0, 1, 0, MAX_GRASS));

  while (grass.length < targetAmount) {
    grass.push(createGrass());
  }

  // Grow or shrink the vines
  for (let i = 0; i < grass.length; i++) {
    if (i < targetAmount) {
      grass[i].growth += 0.01;

      if (grass[i].growth > 1) {
        grass[i].growth = 1;
      }
    } else {
      grass[i].growth -= 0.02;

      if (grass[i].growth < 0) {
        grass[i].growth = 0;
      }
    }
  }

  // Remove vines that have disappeared
  for (let i = grass.length - 1; i >= 0; i--) {
    if (grass[i].growth == 0) {
      grass.splice(i, 1);
    }
  }
}


//
// Create vines in an upright triangular distribution
function createGrass() {
  let progress = pow(random(), 0.55);
  let y = lerp(height * 0.12, height, progress);
  let x = width / 2 + random(-width * 0.45 * progress, width * 0.45 * progress);

  return {
    x: x,
    y: y,
    height: random(lerp(12, 45, progress), lerp(28, 145, progress)),
    curl: random(0.2, 0.35),
    phase: random(TWO_PI),
    growth: 0
  };
}

// Draw the growing vines
function drawGrass() {
  for (let g of grass) {
    push();
    translate(g.x, g.y);

    stroke(150, 160, 60);
    strokeWeight(2);
    noFill();

    beginShape();

    for (let i = 0; i <= g.height * g.growth; i += 2) {
      let progress = i / g.height;
      let angle = g.phase + progress * progress * g.curl * TWO_PI;
      let radius = 5 + progress * 25;

      curveVertex(
        cos(angle) * radius,
        -i + sin(angle) * radius
      );
    }

    endShape();
    pop();
  }
}
