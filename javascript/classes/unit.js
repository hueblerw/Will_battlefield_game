var Unit = function(unitname, type, soldiers, leader, color) {
  	this.unitname = unitname;
  	this.type = type;
  	this.soldiers = soldiers;
  	this.wounded = 0;
  	this.dead = 0;
  	this.leader = leader;
  	this.experience = 0;
  	this.position = null;
  	this.destination = null;
    this.player_color = color;
    this.speed = 2.0;
}

Unit.prototype.Firepower = function(){
	return 3.0;
}

Unit.prototype.Meleepower = function(){
	return 1.0;
}

Unit.prototype.XOrientation = function() {
  if (this.destination != null && this.position != null){
    if (this.destination.x > this.position.x){
      return 1;
    } else {
      return -1;
    }
  }
}

Unit.prototype.YOrientation = function() {
  if (this.destination != null && this.position != null){
    if (this.destination.y > this.position.y){
      return 1;
    } else {
      return -1;
    }
  }
}