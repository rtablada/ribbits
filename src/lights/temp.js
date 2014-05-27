// Prep the Johnny Five library and board call
var five = require("johnny-five"),
	board = new five.Board();

// When the board is ready, let's do this
board.on("ready", function() {

	// Declar pin variables for the LEDS
	var red = five.Led(9);
	var sensor = five.Sensor({
		pin: "A0",
		freq: 250
	});

	board.repl.inject({
		sensor: sensor
	});

	var logTemp = function() {
		var voltage = this.value * 0.004882814;
		var celcius = (voltage - 0.5) * 100.0;
		var fahrenheit = celcius * (9.0/5.0) + 32.0;

		console.log(
			"voltage: " + voltage +
			"\tdegree C: " + celcius +
			"\tdegree F: " + fahrenheit
		);
	};

	sensor.on('data', logTemp);
});
