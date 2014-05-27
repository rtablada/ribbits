// Prep the Johnny Five library and board call
var five = require("johnny-five"),
	board = new five.Board();

// When the board is ready, let's do this
board.on("ready", function() {
	var servo = five.Servo(9);

	var positions = [90, 180, 0];

	for(var x = 0; x < positions.length; x ++) {
		this.wait(1000, function() {
			servo.to(positions[x]);
		});
	}
	this.wait(4000, function() {
		servo.sweep();
	});
});
