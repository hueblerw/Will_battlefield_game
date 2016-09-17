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
	        base *= 2.0;
	        break;
	    case "mountains":
	        base *= 3.0;
	        break;
	}

	return base;
}