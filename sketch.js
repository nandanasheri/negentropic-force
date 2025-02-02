let wait = 1000;
let locZ = 0;
let time = 0;
let c;
let g;
let x1, x2, x3, x4, y2, y3;
let petals = 30;
let ang;
let off = 0;
let rotAng = 1;
let lfx = 0;
let lfy = 0;
let lfrot = 0.2;
let colorcount = 0;
let bgColors = [];

let duo1 = 0;
let duo2 = 0;

let quad1 = 0;
let quad2 = 0;
let quad3 = 0;
let quad4 = 0;

let atomOff = 0;
let starsArr = [];

let spirot = 360/30;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  time = millis(); 
  c = color(216, 58, 90);
  g = 'white';
  background(c);
  print(windowWidth, windowHeight);
  setColors();
  noCursor();
}

function draw() {
  if ((millis() - time) <= 4000) {
    grains(216, 58, 90);
    lineflower();
  }
  else if ((millis() - time) > 4000 && (millis() - time) < 6000 ) {
    lfx = 0;
    lfy = 0;
    lfrot = 0.2;
  }
  else if ((millis() - time) > 6000 && (millis() - time) < 11000) {
    lineflower();
  }
  else if ((millis() - time) > 11000 && (millis() - time) < 14000) {
    spirograph();
  }
  else if ((millis() - time) > 14000 && (millis() - time) < 17000) {
    duoSpiro();
  }
  else if ((millis() - time) > 17000 && (millis() - time) < 26000) {
    quadSpiro();
  }
  else if ((millis() - time) >= 26000 && (millis() - time) < 33000) {
    background(0,0,0);
    mandala();
  }
  else if ((millis() - time) >= 33000 && (millis() - time) < 46000) {
    background(0,0,0);
    Light();
  }
  else {
    atom();
  }
}

class Star {
  constructor() {
    this.x = random(-windowWidth/2, windowWidth/2);
	this.y = random(-windowHeight/2, windowHeight/2);
	this.size = random(1,6);
  }
}

function Light() {
  colorMode(RGB);
  // move your mouse to change light position
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(250, 250, 250, 0, 0, 400);
  locX += 10;
  locY += 10;
  locZ += .5;
  noStroke();
  sphere(150 + locZ);
}

// get granular film effect - random circles + lines
// also change background color as time proceeds
function grains(r,g,b) {
  background(c);
  stroke('black');
  strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    let grainsX = random(-windowWidth, windowWidth);
    let grainsY = random(-windowHeight, windowHeight);
    ellipse(grainsX, grainsY, 2, 7);
  }
  
  let lineC = random (-windowWidth, windowWidth);
  line(lineC, -windowHeight, lineC, windowHeight);
  
  if ((millis() - time) >= 200 && colorcount < 25) {
    c = bgColors[colorcount];
    time = millis(); //also update the stored time
    colorcount += 1;
  }
}

function mandala() {
  angleMode(DEGREES);
  colorMode(HSB);
  
  ang = 360/petals;
  let randx = windowWidth/8;
  
  for (let j = 10; j > 0; j--) {
    let ly = j/10;
    x1 = int(random(randx*ly, (randx + 20)*ly));
    x4 = int(random((randx + 40)*ly, (randx + 55)*ly));
    x2 = int(random((randx + 5)*ly, (randx + 25)*ly));
    y2 = int(random(0, (windowHeight/10)*ly));
    x3 = int(random((randx + 20)*ly, (randx + 40)*ly));
    y3 = int(random(0, (windowWidth/10)*ly));

    let hue = random(256);
    let sat = random(70, 100);
    let bright = random(70, 100);

    stroke(hue, sat, bright);
    strokeWeight(3);
    fill(hue, sat, bright);

    //creating petals
    for (let i = 0; i < petals; i++) {
      beginShape();
        curveVertex(x1, 0);
        curveVertex(x1, 0);
        curveVertex(x2, y2);
        curveVertex(x3, y3);
        curveVertex(x4, 0);
        curveVertex(x4, 0);
      endShape();
      
       beginShape();
        curveVertex(x1, 0);
        curveVertex(x1, 0);
        curveVertex(x2, -y2);
        curveVertex(x3, -y3);
        curveVertex(x4, 0);
        curveVertex(x4, 0);
      endShape();
      rotate(ang);
    }
  }
}

function spirograph() {
  background(128, 0, 32);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(2);
  noFill();
  rotate(off);
  
  for (let i = 0; i < 30; i++) {
    rotate(spirot);
    ellipse(0+off,0+off, 100,400);
  }
  off += 2;
  
}

function lineflower() {
  //background(0,0,0);
  stroke('white');
  strokeWeight(3);
  rotate(lfrot);
  line(lfx, 0, lfy, 50);
  lfx += 1;
  lfy += 1;
  lfrot += 0.3;
}

// set colors for changing background
function setColors() {
  for (let i = 0; i < 25; i++) {
    bgColors[i] = color(random(0,255), random(0,255), random(0,255))
  }
}

function duoSpiro() {
  background(8, 143, 143);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(2);
  noFill();
  
  push();
    translate(-windowWidth/4,0);
    rotate(duo1);

    for (let i = 0; i < 30; i++) {
      rotate(spirot);
      ellipse(0+duo1,0+duo1, 50,200);
    }
    duo1 += 4;
  pop();
  
  push();
    translate(windowWidth/4,0);
    rotate(duo2);

    for (let i = 0; i < 30; i++) {
      rotate(spirot);
      ellipse(0+duo2,0+duo2, 50,200);
    }
    duo2 += 4;
  pop();
}

function quadSpiro() {
  background(112, 41, 99);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(2);
  noFill();
  
  push();
    translate(-windowWidth/4,-windowHeight/4);
    rotate(quad1);

    for (let i = 0; i < 30; i++) {
      rotate(spirot);
      ellipse(0+quad1,0+quad1, 25,100);
    }
    quad1 += 1;
  pop();
  
  push();
    translate(windowWidth/4, windowHeight/4);
    rotate(quad2);

    for (let i = 0; i < 30; i++) {
      rotate(spirot);
      ellipse(0+quad2,0+quad2, 25,100);
    }
    quad2 += 1;
  pop();
  
  push();
    translate(-windowWidth/4,windowHeight/4);
    rotate(quad3);

    for (let i = 0; i < 30; i++) {
      rotate(spirot);
      ellipse(0+quad3,0+quad3, 25,100);
    }
    quad3 += 1;
  pop();
  
  push();
    translate(windowWidth/4,-windowHeight/4);
    rotate(quad4);

    for (let i = 0; i < 30; i++) {
      rotate(spirot);
      ellipse(0+quad4,0+quad4, 25,100);
    }
    quad4 += 1;
  pop();
}

function atom () {
  colorMode(RGB);
  background(0,58,101); 
  
  // stars
  for (let i = 0 ; i < 10; i++) {
    starsArr[i] = new Star();
    ellipse(mouseX ,mouseY, starsArr[i].size, starsArr[i].size);
  ellipse(starsArr[i].x ,starsArr[i].y, starsArr[i].size, starsArr[i].size);
  }
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(3);
  fill('white');
  ellipse(0,0, 30, 30);
  noFill();
  for (let i = 0; i < 8; i++) {
    rotate(atomOff);
    ellipse(0,0, 60, 200);
  }
  atomOff += 1;
}






