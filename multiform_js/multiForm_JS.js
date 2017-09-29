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

var settings;

var Setting=function(){
this.modulo=10;
this.multipliant=2;
this.showDots=true;
this.showCircle=true;
this.random=function(){
  this.modulo=parseInt(random(3,255));
  this.multipliant=parseInt(random(2,255));
}
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  ellipseMode(CENTER);
  settings=new Setting();
  radius=height/2-50;
  modulo=0010;
  multipliant=002;
  calculateDots();

  startColor=color(255, 0, 0);
  endColor=color(0, 0, 255);

  gui=new dat.GUI()
  gui.add(settings,'modulo',3,255).step(1).listen();
  gui.add(settings,'multipliant',2,255).step(1).listen();
  gui.add(settings,'showCircle');
  gui.add(settings,'showDots');
  gui.add(settings,'random');
}

function draw() {
  calculateDots();
  background(255);
  translate(width/2, height/2);
  //for(var i=0;i<dotsX.length;i++)ellipse(dotsX[i],dotsY[i],100,100);
  stroke(0);
  noFill();
  if (settings.showCircle)ellipse(0, 0, radius*2, radius*2);
  drawLines(settings.multipliant);
  if (settings.showDots)drawDots();
}
function calculateDots() {
  dotsX=[];
  dotsY=[];
  for (var i=0; i<settings.modulo; i++) {
    var angle=(360/settings.modulo)*i;
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
  for (var i=0; i<=settings.modulo; i++) {
    var cStroke=lerpColor(startColor, endColor, i/settings.modulo);
    stroke(cStroke);
    var result=i*settings.multipliant;
    result=result%settings.modulo;
    beginShape();
    vertex(dotsX[i%settings.modulo], dotsY[i%settings.modulo]);
    vertex(dotsX[result], dotsY[result]);
    endShape();
    //    line(dotsX[i%modulo], dotsY[i%modulo], dotsX[result], dotsY[result]);
  }
}
function keyPressed(){
  console.log("yolo");
}
