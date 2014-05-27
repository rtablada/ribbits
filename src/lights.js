var five = require("johnny-five"),
	board = new five.Board();

board.on("ready", function() {
	var red = five.Led(9);
	var green = five.Led(10);
	var blue = five.Led(11);

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

	var num = 0;
	var up = true;

	this.loop(10, function() {
		if (num % 10 == 0) {
			console.log(num);
		}
		if (num == 0 && !up) {
			up = true;
		}
		if (num < 768 && up) {
			showRGB(num);
			num ++;
		} else {
			if (up) {
				up = false;
			}
			showRGB(num);
			num --;
		}
	});
});
