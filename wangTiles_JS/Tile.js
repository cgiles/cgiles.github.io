function Tile() {
  var image;
  var binary="0000";
  var id=0;
  var nb=0;
  var row=0;
  var col=0;
  this.create=function(tImage, tId, tNb,col,row) {
    this.col=col;
    this.row=row;
    this.image=tImage;
    this.id=tId;
    this.nb=tNb;
    this.binary=(tId).toString(2);
    this.binary="0000".substr(this.binary.length)+this.binary;
  }
  this.returnRight=function() {
    var result=false;
    if (this.binary.substring(3).localeCompare('1')==0)result=true;

    return result; 
  }  
  this.returnDown=function() {
    var result=false;
    if (this.binary.substring(2, 3).localeCompare('1')==0)result=true;
    return result;
  }
  this.copy=function(tile){
   this.image=tile.image.get();
   this.binary=tile.binary;
   this.id=tile.id;
   this.nb=tile.nb;
  
  }
}