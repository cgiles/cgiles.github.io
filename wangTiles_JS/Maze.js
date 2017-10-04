function createMaze(nbCol, nbRow) { return new Maze(nbCol, nbRow); }

Maze =
    function(nbCol, nbRow) {
  this.nbCol = nbCol;
  this.nbRow = nbRow;
  this.valueWalls = [];
  this.listCells = [];
  this.init();
  while (this.listCells.length < this.nbCol * this.nbRow)
    this.lookAround(this.listCells.length - 1);
    this.removeWalls();
}

    Maze.prototype.init =
        function() {
  this.listCells.length = 0;
  this.valueWalls.length = 0;
  for (var i = 0; i < this.nbRow * this.nbCol; i++)
    this.valueWalls.push(0);
  var start = Math.trunc(random(this.nbCol * this.nbRow));
  this.listCells.push(start);
  this.voisinsDirection = createNumberDict();
}

        Maze.prototype.lookAround =
            function(id) {
  var posX = this.listCells[id] % this.nbCol;
  var posY = Math.trunc(this.listCells[id] / nbCol);
  var pos = this.listCells[id];
  var voisins = [
    (posX != nbCol - 1) ? pos + 1 : -1,
    (posY != 0) ? pos - nbCol : -1,
    (posX != 0) ? pos - 1 : -1,
    (posY != nbRow - 1) ? pos + nbCol : -1
  ];
  for (var i = 0; i < voisins.length; i++)
    this.voisinsDirection.create(str(voisins[i]), i);
  var voisinsDispo = [];
  for (var i = 0; i < voisins.length; i++) {
    if (this.valueWalls[voisins[i]] > 0)
      voisins[i] = -1;
    if (voisins[i] >= 0)
      voisinsDispo.push(voisins[i]);
  }
  if (voisinsDispo.length > 0) {
    var tId = Math.trunc(random(voisinsDispo.length));
    var wallsToFall = this.getVoisinsDirections(voisinsDispo[tId]);
    this.valueWalls[this.listCells[id]] += wallsToFall[0];
    this.valueWalls[voisinsDispo[tId]] += wallsToFall[1];
    this.listCells.push(voisinsDispo[tId]);

  } else if (id > 0) {
    id--;
    this.lookAround(id);
  }
}

            Maze.prototype.getVoisinsDirections =
                function(vId) {
  var result = [ 0, 0 ];
  console.log(this.voisinsDirection.key(0));
  var directionValue = this.voisinsDirection.get(str(vId));
  switch (directionValue) {
  case 0:
    result[0] = 1;
    result[1] = 4;
    break;
  case 1:
    result[0] = 8;
    result[1] = 2;
    break;
  case 2:
    result[0] = 4;
    result[1] = 1;
    break;
  case 3:
    result[0] = 2;
    result[1] = 8;
    break;
  default:
    result[0] = 0;
    result[1] = 0;
    break;
  }
  return result;
}

                Maze.prototype.getMaze = function() { return this.valueWalls; }

                                         Maze.prototype.removeWalls =
                    function() {
  for (var i = 0; i < Math.trunc(this.nbCol * this.nbRow / 10); i++) {
    var rId = Math.trunc(random(1, this.nbCol - 1)) +
              Math.trunc(random(1, this.nbRow - 1)) * this.nbCol;
    if (this.valueWalls[rId] % 2 == 0) {
      this.valueWalls[rId]++;
      this.valueWalls[rId + 1] += 4;
    } else if (this.valueWalls[rId] % 2 == 0) {
      this.valueWalls[rId] += 8;
      this.valueWalls[rId - nbCol] += 2;
    }
  }
}
