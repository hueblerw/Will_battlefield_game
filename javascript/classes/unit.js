var Unit = function(unitname, type, soldiers, leader) {
  	this.unitname = unitname;
  	this.type = type;
  	this.soldiers = soldiers;
  	this.wounded = 0;
  	this.dead = 0;
  	this.leader = leader;
  	this.experience = 0;
}

Unit.prototype.Firepower = function(){
	return 3.0;
}

Unit.prototype.Meleepower = function(){
	return 1.0;
}