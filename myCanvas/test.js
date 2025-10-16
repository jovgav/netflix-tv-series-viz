function setup() {
  createCanvas(800, 600);
  background(0);
  console.log("p5.js is working!");
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("p5.js is working!", width/2, height/2);
  
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 50, 50);
}
