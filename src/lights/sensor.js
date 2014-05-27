// Prep the Johnny Five library and board call
var five = require("johnny-five"),
	board = new five.Board();

// When the board is ready, let's do this
board.on("ready", function() {

	// Declar pin variables for the LEDS
	var red = five.Led(9);
	var sensor = five.Sensor("A0");

	board.repl.inject({
		sensor: sensor
	});

	var updateLight = function() {
		red.brightness(sensor.value);
	};

	sensor.on('change', updateLight);
});
