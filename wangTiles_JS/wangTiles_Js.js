
var myTiles=[];
var tileSet=[];
var pacManSet=[];
var isDrawingText=false;
var nbCol;
var nbRow;
var t1,t2;
var myWalker;

function preload() {
  for (var i=0; i<16; i++) {
    var name="assets/pTiles/"+nf(i, 2)+".png";
    var tileT=loadImage(name);
    tileSet.push(tileT);
  } 
  for(var i=0;i<3;i++){
    console.log(i);
  var name="assets/pacman"+nf(i, 2)+".png";
    var pmT=loadImage(name);
    pacManSet.push(pmT);
}

  var id=parseInt(random(16));
  // myTile.create("assets/00.png", 7, 6) ;
  //console.log(myTile.binary);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  nbCol=width/32;
  nbRow=parseInt(height/32);
  imageMode(CENTER);
  textAlign(CENTER);
  generateMap();
  myWalker=new Walker();
  myWalker.create(nbCol, nbRow, myTiles);
t1=new Tile();
t2=new Tile();
t1.create(tileSet[0],0,15);
t2.copy(t1);
console.log("T1:"+t1.id+"T2:"+t2.id);

t1.create(tileSet[1],1,14);
console.log("T1:"+t1.id+"T2:"+t2.id);
}

function draw() {

  background(255);
  for (var i=0; i<nbRow; i++) {
    for (var j=0; j<nbCol; j++) {
      var posX=j*32+16;
      var posY=i*32+16;
      var id=j+i*nbCol;
      image(myTiles[id%myTiles.length].image, posX, posY);
      if (isDrawingText)text(myTiles[id%myTiles.length].nb, posX, posY);
    }
  }
  myWalker.update();
  myWalker.display();
  fill(255);
  if(frameCount<200)text("press or touch for generate another map", width/2, height/2);
  //drawGrid();
  //image(myTile.image, 0, 0);
}
function touchEnded() {
  generateMap();
  myWalker.create(nbCol, nbRow, myTiles);
}
function keyReleased() {
  
   /* if (isDrawingText==true) {
      isDrawingText=false;
    } else {
      isDrawingText=true;
    }*/
  
}
function drawGrid() {
  stroke(127);
  for ( var i=0; i<nbCol; i++) {
    line(i*32, 0, i*32, height);
  }
  for ( var i=0; i<nbRow; i++) {
    line(0, i*32, width, i*32);
  }
}

function generateMap() {
  myTiles=[];
  var col=0;
  var row=0;
  var nb=0;
  for (var i=0; i<nbRow; i++) {
    for (var j=0; j<nbCol; j++) {
      var id=0;
      var fakeBin=0;
      nb=j+i*nbCol;
      var nbLeft=(col!=0)?nb-1:-1;
      var nbTop=(row!=0)?nb-nbCol:-1;
      fakeBin+=(nbLeft>=0&&myTiles[nbLeft].returnRight())?100:0;
      fakeBin+=(nbTop>=0&&myTiles[nbTop].returnDown())?1000:0;
      fakeBin+=((j+1)<nbCol)?parseInt(random(2), 10):0;
      fakeBin+=((i+1)<nbRow)?parseInt(random(2), 10)*10:0;
      var sFaBin=nf(fakeBin, 4);
      id=parseInt(sFaBin, 2);
      var tTile=new Tile();
      tTile.create(tileSet[id], id, nb,j,i);
      myTiles.push(tTile);
      col++;
      //console.log(nb+" "+ sFaBin);
    }
    col=0;
    row++;
  }
}