function Gnome() {
  this.body=[]; 
  this.seed=millis(); 
  this.gWidth; 
  this.gHeight=10;
}
Gnome.prototype.init =function() {
  this.gWidth=this.gHeight/2; 
  for (var i=0; i<this.gWidth; i++) {
    this.body[i]=[]; 
    for (var j=0; j<this.gHeight; j++) {
      this.valT=random(2); 
      this.boolT=false; 
      if (this.valT>1) {
        print("we have a winner"); 
        this.boolT=true;
      }
      this.body[i][j]=this.boolT;
    }
  }
}
Gnome.prototype.show=function() {


  for (var i=0; i<this.gWidth; i++) {

    for (var j=0; j<this.gHeight; j++) {
      if (this.body[i][j]) {
        rect(i*10, j*10, 10, 10); 
        rect(10*this.gWidth+10*(this.gWidth-1)-i*10, j*10, 10, 10);
      }
    }
  }
}
Gnome.prototype.getChild= function(){
 for (var i=0; i<this.gWidth; i++) {

    for (var j=0; j<this.gHeight; j++) {
      this.evoleV=random(10);
      this.boolT=random(2);
      this.parentB=this.body[i][j];
      if (this.evolveV>9)this.boolT>1?true:false;
    }
  }
}