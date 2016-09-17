var Board = function(x, y) {
	this.tiles = [];
	for (i=0; i < y; i++){
		var tileRow = [];
	  	for (i=0; i < x; i++){
	  		tileRow.push(new Tile());
	  	}
	  	this.tiles.push(tileRow);
	}
}

Board.prototype.Width = function(){
	return tiles[0].length;
}

Board.prototype.Height = function(){
	return tiles.length;
}