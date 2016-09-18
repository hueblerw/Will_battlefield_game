var Tile = function(terrain, habitat) {
  	this.terrain = terrain;
  	this.habitat = habitat;
}

Tile.prototype.MovementCost = function(){
  	var base = 1.0;

  	switch(this.habitat) {
	    case "forest":
	        base = 1.2;
	        break;
	    case "swamp":
	        base = 1.8;
	        break;
	}

	switch(this.terrain) {
	    case "hills":
	        base *= 1.5;
	        break;
	    case "mountains":
	        base *= 2.0;
	        break;
	}

	return base;
}

Tile.prototype.printSquare = function(){
	return this.terrain.charAt(0).toUpperCase() + "-" + this.habitat.charAt(0).toUpperCase();
}