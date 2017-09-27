var dotsX=[];
var dotsY=[];

var radius;
var modulo;
var multipliant;
var startColor;
var endColor;

var showDots=true;
var showCircle=true;
var shouldSave=false;

var gui;

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  ellipseMode(CENTER);
  radius=height/2-50;
  modulo=0010;
  multipliant=002;
  calculateDots();
  gui=createGui('Settings');
  gui.addGlobals('modulo', 'multipliant', 'showDots', 'showCircle');

  startColor=color(255, 0, 0);
  endColor=color(0, 0, 255);
}

function draw() {
  calculateDots();
  background(255);
  translate(width/2, height/2);
  //for(var i=0;i<dotsX.length;i++)ellipse(dotsX[i],dotsY[i],100,100);
  stroke(0);
  noFill();
  if (showCircle)ellipse(0, 0, radius*2, radius*2);
  drawLines(multipliant);
  if (showDots)drawDots();
}
function calculateDots() {
  dotsX=[];
  dotsY=[];
  for (var i=0; i<modulo; i++) {
    var angle=(360/modulo)*i;
    dotsX.push(cos(radians(angle-90))*radius);
    dotsY.push(sin(radians(angle-90))*radius);
  }
}
function drawDots() {
  for (var i=0; i<dotsX.length; i++) {
    //pushStyle();
    fill(255);
    stroke(0);

    ellipse(dotsX[i], dotsY[i], 10, 10);
    //  popStyle();
  }
}
function drawLines() {
  for (var i=0; i<=modulo; i++) {
    var cStroke=lerpColor(startColor, endColor, i/modulo);
    stroke(cStroke);
    var result=i*multipliant;
    result=result%modulo;
    beginShape();
    vertex(dotsX[i%modulo], dotsY[i%modulo]);
    vertex(dotsX[result], dotsY[result]);
    endShape();
    //    line(dotsX[i%modulo], dotsY[i%modulo], dotsX[result], dotsY[result]);
  }
}