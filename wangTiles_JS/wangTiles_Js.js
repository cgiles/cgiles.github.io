var Tile=function() {
  var image;
  var binary="0000";
  var id=0;
  var nb=0;
  this.create=function(tImage, tId, tNb) {

    this.image=tImage;
    this.id=tId;
    this.nb=tNb;
    this.binary=(tId).toString(2);
    this.binary="0000".substr(this.binary.length)+this.binary;
  }
  this.returnRight=function() {
    var result=false;
    if (this.binary.substring(3).localeCompare('1')==0)result=true;
console.log(this.binary);
    return result;
  }  
  this.returnDown=function() {
    var result=false;
    if (this.binary.substring(2,3)==='1')result=true;
    return result;
  }
}

var myTiles=[];
var tileSet=[];

var nbCol;
var nbRow;


function preload() {
  for (var i=0; i<16; i++) {
    var name="assets/"+nf(i, 2)+".png";
    var tileT=loadImage(name);
    tileSet.push(tileT);
  }
  var id=parseInt(random(16));
  // myTile.create("assets/00.png", 7, 6) ;
  //console.log(myTile.binary);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  nbCol=width/32+1;
  nbRow=parseInt(height/32)+1;
  imageMode(CENTER);
  generateMap();
}

function draw() {
  background(255);
  for(var i=0;i<nbRow;i++){
  for(var j=0;j<nbCol;j++){
    var posX=j*32+16;
    var posY=i*32+16;
    var id=j+i*nbCol;
    image(myTiles[id%myTiles.length].image,posX,posY);
  //  text(myTiles[id%myTiles.length].nb,posX,posY);
  }
  
  }
  //drawGrid();
  //image(myTile.image, 0, 0);
}
function touchEnded(){
generateMap();
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
      fakeBin+=((j+1)<nbCol)?parseInt(random(2),10):0;
      fakeBin+=((i+1)<nbRow)?parseInt(random(2),10)*10:0;
      var sFaBin=nf(fakeBin,4);
      id=parseInt(sFaBin,2);
      var tTile=new Tile();
      tTile.create(tileSet[id],id,nb);
      myTiles.push(tTile);
      col++;
      //console.log(nb+" "+ sFaBin);
    }
    col=0;
    row++;
  }
}