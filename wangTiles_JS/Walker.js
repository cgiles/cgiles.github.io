function Walker() {
  this.nbCol=0;
  this.nbRow=0;
  this.tiles=[];
  this.tileX=0;
  this.tileY=0;
  this.tileId=0;
  this.prevTileId=0;
  this.position;
  this.destination;
  this.isAtDestination;
  this.playList=[0, 1, 2, 1];
  this.playPos=0;
  this.pmAngle=0;
  this.create=function(nbCol, nbRow, tiles) {
    this.nbCol=nbCol;
    this.nbRow=nbRow;
    this.tiles=tiles;
    this.tileX=Math.trunc(random(nbCol));
    this.tileY=Math.trunc(random(nbRow));
    this.tileId=this.tileX+this.tileY*this.nbCol;
    this.position=createVector(this.tileX*32+16, this.tileY*32+16, 0);
    this.destination=this.position.copy();
  }
  this.display=function() {
 
    push();
    translate(this.position.x, this.position.y);
    rotate(this.pmAngle);
    image(pacManSet[this.playList[this.playPos%this.playList.length]], 0,0, 20, 20);
    //fill(255, 0, 0);
    //ellipse(this.position.x, this.position.y, 10, 10);
    pop();
  }
  this.update=function() {
    if (frameCount%10==0)this.playPos++;
    console.log(" tileX :"+this.tileX+" tileY :"+this.tileY+" id:"+this.tileId+" pid:"+this.prevTileId+"dest:"+this.destination);
    if (this.position.equals(this.destination)) {
      this.prevTileId=Math.trunc(this.tileId);
      this.tileX=(this.position.x-16)/32;
      this.tileY=(this.position.y-16)/32;  
      this.tileId=this.tileX+this.tileY*this.nbCol;
      this.possibleWay=this.lookAround();
      if (this.possibleWay.length==1)this.destination.set(this.possibleWay[0].col*32+16, this.possibleWay[0].row*32+16);
      if (this.possibleWay.length>1) {
        this.rId=0;
        do {
          this.rId=Math.trunc(random(this.possibleWay.length));
          this.destination.set(this.possibleWay[this.rId].col*32+16, this.possibleWay[this.rId].row*32+16);
        } while (this.possibleWay[this.rId].nb==this.prevTileId);
      }
    } else if (this.position.dist(this.destination)>1.0) {
      this.position.lerp(this.destination, 0.1);
    } else {
      this.position=this.destination.copy();
    }
    this.reference=createVector(1,0);
   this.destNorma=createVector(0,0);
    this.destNorma=this.destination.copy();
    this.destNorma.sub(this.position);
    this.destNorma.normalize();
    this.pmAngle=p5.Vector.angleBetween(this.destNorma,this.reference);
    if(degrees(this.pmAngle)==90&&this.destination.y<this.position.y)this.pmAngle*=-1;
  }
  this.lookAround=function() {
    this.aroundTile=[];
    this.posTileBin=this.tiles[this.tileId].binary;
    if (this.posTileBin.substring(3).localeCompare('1')==0)this.aroundTile.push(this.tiles[this.tileId+1]);
    if (this.posTileBin.substring(2, 3).localeCompare('1')==0)this.aroundTile.push(this.tiles[this.tileId+nbCol]);
    if (this.posTileBin.substring(1, 2).localeCompare('1')==0)this.aroundTile.push(this.tiles[this.tileId-1]);
    if (this.posTileBin.substring(0, 1).localeCompare('1')==0)this.aroundTile.push(this.tiles[this.tileId-nbCol]);
    return this.aroundTile;
  }
}

/*function Walker() {
 this.nbRow=0;
 this.nbCol=0;
 this.position=createVector(0, 0);
 this.destination=createVector(0, 0);
 this.provenance=createVector(0, 0);
 this.onTile=new Tile();
 this.prevTile=new Tile();
 this.tiles=[];
 this.nextNb;
 this.create=function(nbCol, nbRow, tiles) {
 this.nbCol=nbCol;
 this.nbRow=nbRow;
 this.onTile=new Tile();
 this.prevTile=new Tile();
 this.tiles=tiles.slice();
 do {
 this.tileX=parseInt(random(nbCol));
 this.tileY=parseInt(random(nbRow));
 console.log(this.tileX+' '+this.tileY);
 this.onTile.copy(this.tiles[this.tileX+this.tileY*this.nbCol]);
 this.position=createVector(this.tileX*32+16, this.tileY*32+16);
 this.destination=this.position.copy();
 } while (this.onTile.binary.localeCompare('0000')==0);
 }
 this.display=function() {
 push();
 stroke(255);
 fill(255, 0, 0);
 ellipse(this.position.x, this.position.y, 20, 20);
 fill(0);
 text(str(this.nextNb), this.position.x, this.position.y);
 pop();
 }
 this.getTile=function() {
 this.tileX=parseInt((parseInt(this.position.x)-16)/32)+1;
 this.tileY=parseInt((parseInt(this.position.y)-16)/32)+1;
 this.tileId=this.tileX+this.tileY*nbCol;
 this.onTile.copy(this.tiles[this.tileId]);
 ellipse(this.tileX*32+16, this.tileY*32+16, 10, 10);
 text(str(this.onTile.nb), this.tileX*32+16, this.tileY*32+16);
 }
 this.move = function() {
 if (this.position.dist(this.destination)>1) {
 this.position.lerp(this.destination, 0.1);
 return true;
 } else {
 this.position=this.destination.copy();
 return false
 }
 }
 this.update=function() {
 if (!this.move()) {
 if (this.prevTile.nb!=this.onTile.nb)this.prevTile.copy(this.onTile);
 this.provenance=this.position.copy();
 console.log("provenace :"+this.provenance);
 this.getTile();
 // this.nbWay=(this.onTile.binary.match(/1/g)||[]).length;
 
 var destinationVector=[];
 if (this.onTile.binary.substring(3).localeCompare('1')==0)destinationVector.push(createVector(this.position.x+32, this.position.y));
 if (this.onTile.binary.substring(2, 3).localeCompare('1')==0)destinationVector.push(createVector(this.position.x, this.position.y+32));
 if (this.onTile.binary.substring(1, 2).localeCompare('1')==0)destinationVector.push(createVector(this.position.x-32, this.position.y));
 if (this.onTile.binary.substring(0, 1).localeCompare('1')==0)destinationVector.push(createVector(this.position.x, this.position.y-32));
 
 // console.log(this.onTile.binary.substring(3));
 console.log("avant :"+str(destinationVector.length));
 var self=this;
 var indexProvenance=destinationVector.findIndex(function(el) {
 //console.log(el+":"+self.provenance);
 return parseInt(el.x,10)==parseInt(self.provenance.x,10)&&el.y==self.provenance.y;
 });
 if (indexProvenance>-1)destinationVector.slice(indexProvenance, 1);
 console.log("après :"+str(destinationVector.length+" "+ indexProvenance));
 this.destination=destinationVector[0];
 //if (destinationTile.length>1) {
 
/*
 this.nbT=destinationTile[floor(random(destinationTile.length))].nb;
 this.nextNb=this.nbT;
 this.destination.x=(this.nbT%this.nbCol)*32+16;
 this.destination.y=floor(this.nbT/this.nbCol)*32+16;/*
 var destinationTile=[];
 if (this.onTile.binary.substring(3).localeCompare('1')==0)destinationTile.push(this.tiles[this.onTile.nb+1]);
 if (this.onTile.binary.substring(2, 3).localeCompare('1')==0)destinationTile.push(this.tiles[this.onTile.nb+nbCol]);
 if (this.onTile.binary.substring(1, 2).localeCompare('1')==0)destinationTile.push(this.tiles[this.onTile.nb-1]);
 if (this.onTile.binary.substring(0, 1).localeCompare('1')==0)destinationTile.push(this.tiles[this.onTile.nb-nbCol]);
 
 console.log(this.onTile.binary.substring(3));
 console.log("avant :"+str(destinationTile.length));
 //if (destinationTile.length>1) {
 destinationTile=destinationTile.filter( function(el){
 if(this.prevTile!='undefined'){
 return el.nb!==this.prevTile.nb;
 }else return true;
 });
 console.log("après :"+destinationTile.length);
 
 
 this.nbT=destinationTile[floor(random(destinationTile.length))].nb;
 this.nextNb=this.nbT;
 this.destination.x=(this.nbT%this.nbCol)*32+16;
 this.destination.y=floor(this.nbT/this.nbCol)*32+16;
 } else  if (destinationTile.length<1) {
 
 this.nbT=destinationTile[floor(random(destinationTile.length-1))].nb;
 this.nextNb=this.nbT;
 this.destination.x=(this.nbT%this.nbCol)*32+16;
 this.destination.y=floor(this.nbT/this.nbCol)*32+16;
 
 }
 }
 }*/