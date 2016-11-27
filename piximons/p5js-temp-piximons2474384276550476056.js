

var mesGnomes=[];
var nombGnomes;
var cols;
var rows;
var space=125;
var leftO;
var upO;
var upgradeTime=30;
var idUpgraded=0;
var firstDraw=true;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(HSB, 100);
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
  if (firstDraw) {
    firstDraw=false;
    background(0); 
    stroke(0, 0, 100); 

    fill(0, 0, 100); 
    //  text(frameCount%upgradeTime,10,10);


    push();
    translate(leftO, upO); 
    var k=0;
    for (var i=0; i<rows; i++) {
      for (var j=0; j<cols; j++) {
        push(); 
        translate(j*space, i*space); 
        push();
        noFill();
        //if(k==idUpgraded)rect(0,0,100,100);
        pop();
        mesGnomes[k].show(); 
        pop();
        k++;
      }
    }

    pop();
  }
  noStroke();
  fill(0);
  rect(0, 0, 100, 20);
  fill(255);
  stroke(255);
  text(frameRate(), 20, 10);
  if (frameCount%upgradeTime==0) {
    push();
      translate(leftO, upO); 
      var posY=floor(idUpgraded/cols);
      var posX=idUpgraded%cols;
      translate(space*posX,space*posY);
      noStroke();
      fill(0);
      rect(-5,-5,130,130);
      
      mesGnomes[idUpgraded].getChild();
      mesGnomes[idUpgraded].show();
    idUpgraded++; 
    if (idUpgraded>nombGnomes-1)idUpgraded=0;
  pop();  
}
  
}