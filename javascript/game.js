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

		for (i = 0; i < board.Width(); i++) {
			for (j = 0; j < board.Height(); j++){
				ctx.beginPath();
				ctx.rect(x, y, 49, 49);
				ctx.fillStyle = "#FF0000";
				ctx.fill();
				ctx.closePath();
				x += 50;
			}
			x = 0;
			y += 50;
		}
		
	});
}




