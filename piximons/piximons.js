

var mesGnomes=[];
var nombGnomes;
var cols;
var rows;
var space=125;
var leftO;
var upO;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(HSB,100);
  cols=floor(width/space);
  rows=floor(height/space);
  leftO=(width-(space*(cols-1)+100))/2;
  upO=(height-((rows-1)*space+100))/2;  
  nombGnomes=cols*rows;
  for (var i=0; i<nombGnomes; i++) {
    mesGnomes[i]=new Gnome(); 
    mesGnomes[i].init();
  }
}

function draw() {
  background(0); 
  stroke(0,0,100); 
  
  fill(0,0,100); 
translate(leftO, upO); 
var k=0;
  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      push(); 
      translate(i*space, j*space); 
      mesGnomes[k].show(); 
      pop();
      k++;
    }
  }
}