

var mesGnomes=[];
var nombGnomes;
var cols;
var rows;
var space=125;
var leftO;
var upO;
var upgradeTime=10;
var idUpgraded=0;
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
    noSmooth();
  }
}

function draw() {

  background(0); 
  stroke(0,0,100); 
  
  fill(0,0,100); 
 //  text(frameCount%upgradeTime,10,10);
   
 // text(idUpgraded,20,10);
translate(leftO, upO); 
var k=0;
  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      push(); 
      translate(i*space, j*space); 
      push();
      noFill();
       //if(k==idUpgraded)rect(0,0,100,100);
      pop();
      mesGnomes[k].show(); 
      pop();
      k++;
    }
  }
  if(frameCount%upgradeTime==0){
    mesGnomes[idUpgraded].getChild();
    idUpgraded++;
   if(idUpgraded>nombGnomes-1)idUpgraded=0;
  }
 
}