let music;
let volumeSlider;

// Load music
function preload() {
  music = loadSound("assets/music.mp3");
}


// Create volume slider
function setupAudio() {
  volumeSlider = createSlider(0, 1, 0, 0.01);

  volumeSlider.position(
    (windowWidth - 200) / 2,
    (windowHeight + height) / 2 + 20
  );
  volumeSlider.style("width", "200px");
}


// Get the current volume
function getVolume() {
  return volumeSlider.value();
}

// Update music volume
function updateAudio() {
  music.setVolume(volumeSlider.value());
}

// Start music when the user clicks
function mousePressed() {
  if (!music.isPlaying()) {
    music.loop();
  }
}
