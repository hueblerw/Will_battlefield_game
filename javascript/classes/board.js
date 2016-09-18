var Board = function(x, y) {
	this.tiles = [];

	var infoArray = this.makeInfoArray(x, y);
	var habitat = "plains";
	var terrain = "";
	for (var i = 0; i < y; i++){
		var tileRow = [];
	  	for (var j = 0; j < x; j++){
	  		var num = Math.floor(Math.random() * 11);
	  		if (num === 10){
	  			terrain = "mountains"
	  		} else if(num > 8){
	  			terrain = "hills";
	  		} else {
	  			terrain = "flat";
	  		}
	  		if (infoArray[i][j] > 6.0) {
	  			habitat = "swamp";
	  		} else if (infoArray[i][j] > 4.0) {
	  			habitat = "forest";
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
	for (var i = 0; i < this.Height(); i++){
		for (var j = 0; j < this.Width(); j++){
			row = row + this.tiles[i][j].printSquare() + "\t";
		}
		console.log(row);
		row = "";
	}
}

Board.prototype.makeInfoArray = function(x, y) {
	var bigArray = [];
	var row = [];
	// Set the upper left corner.
	row.push(Math.random() * 6);
	// Set the upper left row.
	for (var k = 1; k < x; k++){
		row[k] = (Math.random() * 2 - 1) + row[k - 1];
	}
	bigArray.push(row);
	row = [];
	// Do the remaining rows.
	for (var i = 1; i < y; i++){
		row.push((Math.random() * 2 - 1) + bigArray[i - 1][0]);
		for (var j = 1; j < x; j++){
			row.push((Math.random() * 2 - 1) + (row[j - 1] + bigArray[i - 1][j]) / 2);
		}
		bigArray.push(row);
		row = [];
	}
	return bigArray;
}