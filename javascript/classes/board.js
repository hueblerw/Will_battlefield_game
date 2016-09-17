var Board = function(x, y) {
	this.tiles = [];
	var habitat = "plains";
	var terrain = "";
	for (i=0; i < y; i++){
		var tileRow = [];
	  	for (j = 0; j < x; j++){
	  		var num = Math.random() * 10;
	  		if (num === 10){
	  			terrain = "mountains"
	  		} else if(num > 8){
	  			terrain = "hills";
	  		} else {
	  			terrain = "flat";
	  		}
	  		tileRow.push(new Tile(terrain, habitat));
	  	}
	  	this.tiles.push(tileRow);
	}
}

Board.prototype.Width = function(){
	return this.tiles[0].length;
}

Board.prototype.Height = function(){
	return this.tiles.length;
}

Board.prototype.logTheBoard = function(){
	var row = "";
	for (i = 0; i < this.Height(); i++){
		for (j = 0; j < this.Width(); j++){
			row = row + this.tiles[i][j].printSquare() + "\t";
		}
		console.log(row);
		row = "";
	}
}