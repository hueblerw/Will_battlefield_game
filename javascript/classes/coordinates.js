var Coordinates = function(x, y) {
  	this.x = x;
  	this.y = y;
}

Coordinates.prototype.getTileX = function() {
	return Math.floor(this.x / 50);
}

Coordinates.prototype.getTileY = function() {
	return Math.floor(this.y / 50);
}