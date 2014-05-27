// Prep the Johnny Five library and board call
var five = require("johnny-five"),
	board = new five.Board();

// When the board is ready, let's do this
board.on("ready", function() {
	// Creates a piezo object and defines the pin to be used for the signal
	var piezo = new five.Piezo(9);

	var play = function() {
		// Plays a song
		piezo.song("cdfda ag cdfdg gf ", "411111442111111442");
	};

	play();

	// Injects the piezo into the repl
	board.repl.inject({
		piezo: piezo,
		play: play
	});
});
