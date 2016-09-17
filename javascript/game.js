// Run the Game.
GameLogic();

function GameLogic() {
	// Generate the board.
	var game_board = GenerateBoard(8, 8);

	// Generate two player each owning a single infantry unit of 2500 men with a randomly generated leader.
	var players = GeneratePlayers();
	var player1 = players[0];
	var player2 = players[1];

	// Paint the background canvas.
	DisplayBoard(game_board);

	// Place the units at their locations.

}

// Initialization methods

function GenerateBoard(x, y) {
	var board = new Board(8, 8);
	board.logTheBoard();
	return board;
}

function GeneratePlayers() {
	var players = [];
	players.push(new Player("Player 1", "red"));
	players.push(new Player("Player 2", "blue"));
	var leader = new Leader("Gus", Math.floor(Math.random()*13), Math.floor(Math.random()*13), 0);
	var unit = new Unit("Red Infantry", "infantry", 2500, leader);
	players[0].units.push(unit);
	leader = new Leader("Sarah", Math.floor(Math.random()*13), Math.floor(Math.random()*13), 0);
	unit = new Unit("Blue Infantry", "infantry", 2500, leader);
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

		for (i = 0; i < board.Width(); i++) {
			for (j = 0; j < board.Height(); j++){
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
				}
				
				x += 50;
			}
			x = 0;
			y += 50;
		}
	});
}




