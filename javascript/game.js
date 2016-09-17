// Run the Game.
GameLogic();

function GameLogic() {
	// Generate the board.
	var game_board = GenerateBoard(8, 8);

	// Generate two player each owning a single infantry unit of 2500 men with a randomly generated leader.
	var players = GeneratePlayers();
	var player1 = players[0];
	var player2 = players[1];
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
	var leader = new Leader("Gus", Math.random() * 12, Math.random() * 12, 0);
	var unit = new Unit("Red Infantry", "infantry", 2500, leader);
	players[0].units.push(unit);
	leader = new Leader("Sarah", Math.random() * 12, Math.random() * 12, 0);
	unit = new Unit("Blue Infantry", "infantry", 2500, leader);
	players[1].units.push(unit);
	return players;
}





