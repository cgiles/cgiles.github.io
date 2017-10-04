var valueWalls=[];
var listCells=[];
var  nbCol;
var nbRow;
var offset;
var tiles=[];
var voisinsDirection;
function preload() {
  for (var i=0; i<16; i++) {
    tiles.push(loadImage("assets/"+nf(i, 2)+".png"));
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  nbCol=Math.trunc(width/32);
  nbRow=Math.trunc(height/32);
  if (width%32!=0||height%32!=0)offset=createVector(width%32/2, height%32/2);
  init();

  imageMode(CENTER);
}

function draw() {
  background(0);
  var idTile=0;
  translate(offset.x, offset.y);
  for (var y=0; y<nbRow; y++) {
    for (var x=0; x<nbCol; x++) {
      image(tiles[valueWalls[idTile]], x*32+16, y*32+16);
      idTile++;
    }
  }
  
  if(listCells.length<nbCol*nbRow)lookAround(listCells.length-1);
}
function init() {
  listCells.length=0;
  valueWalls.length=0;
  for (var i=0; i<nbCol*nbRow; i++)valueWalls.push(0);
  var start =Math.trunc(random(nbCol*nbRow));
  listCells.push(start);
  voisinsDirection=createNumberDict();
}
function lookAround(id) {
  var posX=listCells[id]%nbCol;
  var posY=Math.trunc(listCells[id]/nbCol);
  var pos=listCells[id];
  var voisins=[(posX!=nbCol-1)?pos+1:-1, (posY!=0)?pos-nbCol:-1, (posX!=0)?pos-1:-1, (posY!=nbRow-1)?pos+nbCol:-1];

  for ( var i=0; i<voisins.length; i++){
    voisinsDirection.create(str(voisins[i]), i);
console.log( "voisin :"+nf(voisins[i],1)+":"+i+":"+voisinsDirection.get(str(voisins[i]))+":"+voisinsDirection.key(i));
}
  var voisinsDispo=[];
  for (var i=0; i<voisins.length; i++) {
    if (valueWalls[voisins[i]]>0)voisins[i]=-1;
    if (voisins[i]>=0)voisinsDispo.push(voisins[i]);
  }
  if (voisinsDispo.length>0) {
    var tId=Math.trunc(random(voisinsDispo.length));
    var wallsToFall=getVoisinsDirections(voisinsDispo[tId], voisinsDirection);
    valueWalls[listCells[id]]+=wallsToFall[0];
    valueWalls[voisinsDispo[tId]]+=wallsToFall[1];

    listCells.push(voisinsDispo[tId]);

  }else if(id>0){
  id--;
  lookAround(id);
  }
}
function getVoisinsDirections(vId, directions) {
  var result=[0, 0];
  console.log(voisinsDirection.key(0));
  var directionValue=voisinsDirection.get(str(vId));
  switch(directionValue) {
  case 0:
    result[0]=1;
    result[1]=4;
    break;
   case 1:
    result[0]=8;
    result[1]=2;
    break;
    case 2:
    result[0]=4;
    result[1]=1;
    break;
    case 3:
    result[0]=2;
    result[1]=8;
    break;
    default :
    result[0]=0;
    result[1]=0;
    break;
  }
  return result;
}
function touchEnded(){
  init();
}
