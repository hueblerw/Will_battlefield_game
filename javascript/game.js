// Run the Game.
InitializeDivs();

function GameLogic(x, y) {
	// Hide stuff and get the board dimensions.
	// Generate the board.
	var game_board = GenerateBoard(x, y);

	// Generate two player each owning a single infantry unit of 2500 men with a randomly generated leader.
	var players = GeneratePlayers(game_board);
	var player1 = players[0];
	var player2 = players[1];

	// Paint the background canvas.
	DisplayBoard(game_board);

	// Place the units at their locations.
	PlaceUnits(players, game_board.Width(), game_board.Height());

	// Create an array containing the things possible to select.
	var units = getUnits(players);

	// Wait for clicks upon the units.
	// Move the red circle across the screen.
	GameWait(units, game_board);
}

// Initialization methods

function InitializeDivs() {
	$(document).ready(function(){
		var dimensionQuestion = document.getElementById("world_dimensions");
		var backgroundCanvas = document.getElementById("board_background");
		var canvas = document.getElementById("board_surface");
		var unit_info = document.getElementById("unit_info_container");
		var battle_info = document.getElementById("battle_info");

		canvas.style.display = 'none';
		backgroundCanvas.style.display = 'none';
		unit_info.style.display = 'none';
		battle_info.style.display = 'none';

		$("#dimension-form").on('submit', function(event){
			event.preventDefault();
			dimensionQuestion.style.display = 'none';
			canvas.style.display = 'block';
			backgroundCanvas.style.display = 'block';
			unit_info.style.display = 'block';
			GameLogic($("#x").val(), $("#y").val());
		});

	});
}

function GenerateBoard(x, y) {
	var board = new Board(x, y);
	board.logTheBoard();
	return board;
}

function GeneratePlayers(board) {
	var players = [];
	players.push(new Player("Player 1", "red"));
	players.push(new Player("Player 2", "blue"));
	var leader = new Leader("Gus", Math.floor(Math.random()*13), Math.floor(Math.random()*13), 0);
	var unit = new Unit("Red Infantry", "infantry", 2500, leader, "red");
	unit.position = new Coordinates(25, 25);
	players[0].units.push(unit);
	leader = new Leader("Sarah", Math.floor(Math.random()*13), Math.floor(Math.random()*13), 0);
	unit = new Unit("Blue Infantry", "infantry", 2500, leader, "blue");
	unit.position = new Coordinates((board.Width() - 1) * 50 + 25, (board.Height() - 1) * 50 + 25);
	players[1].units.push(unit);
	return players;
}

function DisplayBoard(board) {
	$(document).ready(function(){
		var backgroundCanvas = document.getElementById("board_background");
		var ctx = backgroundCanvas.getContext("2d");
		var x = 0;
		var y = 0;
		backgroundCanvas.width = board.Width() * 50;
		backgroundCanvas.height = board.Height() * 50;

		for (var i = 0; i < board.Width(); i++) {
			for (var j = 0; j < board.Height(); j++){
				// Create the background square.
				ctx.beginPath();
				ctx.rect(x, y, 49, 49);
				switch (board.tiles[i][j].habitat) {
					case "plains":
						ctx.fillStyle = "#00FF00";
		        		break;
		        	case "forest":
						ctx.fillStyle = "#228B22";
		        		break;
		        	case "swamp":
						ctx.fillStyle = "#556B2F";
		        		break;
				}
				ctx.fill();
				ctx.closePath();

				// Create the hills/mountains.
				if (board.tiles[i][j].terrain === "hills"){
					ctx.beginPath();
					ctx.arc(x + 30, y + 35, 10, 0, Math.PI * (4/3), true);
					ctx.fillStyle = "black";
					ctx.arc(x + 20, y + 35, 10, 0, Math.PI, true);
					ctx.fillStyle = "black";
					ctx.stroke();
					ctx.closePath();
				} else if(board.tiles[i][j].terrain === "mountains") {
					ctx.beginPath();
				    ctx.moveTo(x + 10, y + 35);
				    ctx.lineTo(x + 20, y + 10);
				    ctx.lineTo(x + 30, y + 35);
				    ctx.stroke();
				    ctx.moveTo(x + 25, y + 25);
				    ctx.lineTo(x + 30, y + 10);
				    ctx.lineTo(x + 40, y + 35);
				    ctx.stroke();
				}
				
				x += 50;
			}
			x = 0;
			y += 50;
		}
	});
}

function PlaceUnits(players, width, height) {
	$(document).ready(function(){
		var canvas = document.getElementById("board_surface");
		var unit_info = document.getElementById("unit_info_container");
		var ctx = canvas.getContext("2d");
		canvas.width = width * 50;
		canvas.height = height * 50;
		unit_info.style.left = width * 50 + 20;
		battle_info.style.top = height * 50 + 10;

		for (var k = 0; k < players.length; k++){
			var troops = players[k].units;
			for (var i = 0; i < troops.length; i++){
				ctx.beginPath();
				ctx.arc(troops[i].position.x, troops[i].position.y, 20, 0, Math.PI*2, false);
				ctx.fillStyle = players[k].color;
				ctx.fill();
				ctx.closePath();
			}
		}	
	});
}

function getUnits(players) {
	return players[0].units.concat(players[1].units);
}

//////////////////////////////////////////////////////////////////////////////////////////
// Game Moving Units
//////////////////////////////////////////////////////////////////////////////////////////

// Note: The entire coordinate system seems to be backwards as compares x and y but at this point why bother to change that.

function GameWait(units, board) {
	$(document).ready(function() {
		// Initialize the variables.
		var canvas = document.getElementById("board_surface");
		var ctx = canvas.getContext("2d");
		var startingOrientationX = [];
		var startingOrientationY = [];
		var dx = [];
		var dy = [];
		var unit_velocity = [];
		var currentSquare = [];
		var balls;
		var selection = 0;

		// Create empty slots for the units.
		for (var n = 0; n < units.length; n++){
			startingOrientationX.push(null);
			startingOrientationY.push(null);
			dx.push(null);
			dy.push(null);
			unit_velocity.push(0.0);
			currentSquare.push(null);
		}

		$("#board_surface").on('click', function(event) {
			// Get coordinates of destination.
			selection = changeSelection(event, selection);
			for (var n = 0; n < units.length; n++) {
				if (balls != null) {
					clearInterval(balls);
				}
				currentSquare[n] = new Coordinates(units[n].position.getTileY(), units[n].position.getTileX());
				if (n === selection){
					units[n].destination = newDestination(event);
					// Setup the movement animation.
					startingOrientationX[n] = units[n].XOrientation();
					startingOrientationY[n] = units[n].YOrientation();
					unit_velocity[n] = units[n].speed / board.tiles[units[n].position.getTileY()][[units[n].position.getTileX()]].MovementCost();
					dx[n] = startingOrientationX[n] * unit_velocity[n] * Math.cos(Math.atan(Math.abs(units[n].position.y - units[n].destination.y) / Math.abs(units[n].position.x - units[n].destination.x)));
					dy[n] = startingOrientationY[n] * unit_velocity[n] * Math.sin(Math.atan(Math.abs(units[n].position.y - units[n].destination.y) / Math.abs(units[n].position.x - units[n].destination.x)));
				}
			}
			// Animate the motion!
			balls = setInterval(draw, 50);

			function drawInfantry() {
				for (var n = 0; n < units.length; n++){
					// Draws the circle at its postion.
					ctx.beginPath();
				    ctx.arc(units[n].position.x, units[n].position.y, 20, 0, Math.PI*2);
				    ctx.fillStyle = units[n].player_color;
				    ctx.fill();
				    ctx.closePath();
				    // Adds a highlighted border around the selected object
				    if (n === selection) {
				    	ctx.beginPath();
					    ctx.arc(units[n].position.x, units[n].position.y, 22, 0, Math.PI*2);
					    ctx.fillStyle = "yellow";
					    ctx.stroke();
					    ctx.closePath();
				    }
				    
				}
			}

			function draw() {
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    drawInfantry();
			    for (var n = 0; n < units.length; n++) {
			    	if (units[n].destination != null) {
			    		if (sharedSquare(n) === null){
				    		if (Math.sign(units[n].destination.x - units[n].position.x) === startingOrientationX[n] || Math.sign(units[n].destination.y - units[n].position.y) === startingOrientationY[n]){
						    	units[n].position.x += dx[n];
						    	units[n].position.y += dy[n];
						    	if (squareChange(n)){
						    		unit_velocity[n] = units[n].speed / board.tiles[units[n].position.getTileY()][[units[n].position.getTileX()]].MovementCost();
									dx[n] = startingOrientationX[n] * unit_velocity[n] * Math.cos(Math.atan(Math.abs(units[n].position.y - units[n].destination.y) / Math.abs(units[n].position.x - units[n].destination.x)));
									dy[n] = startingOrientationY[n] * unit_velocity[n] * Math.sin(Math.atan(Math.abs(units[n].position.y - units[n].destination.y) / Math.abs(units[n].position.x - units[n].destination.x)));
									currentSquare[n] = new Coordinates(units[n].position.getTileY(), units[n].position.getTileX());
						    	}
						    } else {
						    	units[n].position = units[n].destination;
						    	units[n].destination = null;
						    	// clearInterval(balls);
						    }
			    		} else {
			    			units[n].destination = null;
			    			units[sharedSquare(n)].destination = null;
			    			var battle_info = document.getElementById("battle_info");
			    			battle_info.style.display = 'block';
			    			console.log("BATTLE BEGINS!!!");
			    		}
			    	}
			    } 
			}

			function newDestination(event) {
				var myX = Math.floor(event.clientX / 50) * 50 + 25;
				var myY = Math.floor(event.clientY / 50) * 50 + 25;
				return new Coordinates(myX, myY);
			}

			function changeSelection(event, selection) {
				var clickX = event.clientX;
				var clickY = event.clientY;
				var dist;
				for (var n = 0; n < units.length; n++){
					dist = Math.sqrt(Math.pow(units[n].position.x - clickX, 2) + Math.pow(units[n].position.y - clickY, 2));
					if (dist <= 20){
						return n;
						break;
					}
				}
				return selection;
			}

			function sharedSquare(m) {
				for (var n = 0; n < units.length; n++) {
					if (n != m && currentSquare[m].x == currentSquare[n].x && currentSquare[m].y == currentSquare[n].y) {
						return n;
						break;
					}
				}
				return null;
			}

			function squareChange(n) {
				if (units[n].position.getTileY() === currentSquare[n].x && units[n].position.getTileX() === currentSquare[n].y) {
					return false;
				} else {
					return true;
				}
			}


		});
	});
}

//////////////////////////////////////////////////////////////////////////////////////////
// Game Battle Mode
//////////////////////////////////////////////////////////////////////////////////////////

