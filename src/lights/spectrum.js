// Prep the Johnny Five library and board call
var five = require("johnny-five"),
	board = new five.Board();

// When the board is ready, let's do this
board.on("ready", function() {

	// Declar pin variables for the LEDS
	var red = five.Led(9);
	var green = five.Led(10);
	var blue = five.Led(11);

	// ShowRGB ported from the example from Vilros starter kit Circuit 3
	var showRGB = function(color) {
		var redIntensity, greenIntensity, blueIntensity;
		if (color <= 255) {
			redIntensity = 255 - color;
			greenIntensity = color;
			blueIntensity = 0
		} else if (color <= 511) {
			redIntensity = 0;
			greenIntensity = 255 - (color - 256);
			blueIntensity = (color - 256);
		} else {
			redIntensity = color - 512;
			greenIntensity = 0;
			blueIntensity = 255 - (color - 512);
		}

		red.brightness(redIntensity);
		green.brightness(greenIntensity);
		blue.brightness(blueIntensity);
	}

	// Setup loop variables
	var num = 0;
	var up = true;

	// Run this loop every 10ms
	this.loop(10, function() {
		// If we have been counting down and reached zero, let's start going up
		if (num == 0 && !up) {
			up = true;
		}
		// If we are going up and haven't reached 768, keep going
		if (num < 768 && up) {
			showRGB(num);
			num ++;
		}
		// Otherwise, let's count down!
		else {
			if (up) {
				up = false;
			}
			showRGB(num);
			num --;
		}
	});
});
