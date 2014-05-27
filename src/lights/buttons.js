// Prep the Johnny Five library and board call
var five = require("johnny-five"),
	board = new five.Board();

// When the board is ready, let's do this
board.on("ready", function() {

	// Declar pin variables for the LEDS
	var red = five.Led(13);
	var button1 = five.Button(2);
	var button2 = five.Button(3);

	board.repl.inject({
		button2: button2
	});


	var checkStatus = function() {
		var lightOff = button1.isDown == button2.isDown;
		if (lightOff) {
			red.off();
		} else {
			red.on();
		}
	};

	button1.on('down', checkStatus);
	button2.on('down', checkStatus);
	button1.on('up', checkStatus);
	button2.on('up', checkStatus);
});
