var Tile = function() {
  this.terrain = terrain;
  this.habitat = habitat;
}

Tile.prototype.MovementCost = function(){
  	var base = 1.0;
  	switch(this.habitat) {
	    case "forest":
	        base = 1.4;
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
}