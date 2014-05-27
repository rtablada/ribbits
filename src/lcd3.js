var five = require("johnny-five"),
  board, lcd;

board = new five.Board();

board.on("ready", function() {

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    rows: 2,
    cols: 16
  });

  lcd.on("ready", function() {

    var frame = 1,
      col = 0,
      row = 0;

    var lorem = "Lorem";

    board.loop(500, function() {

      lcd.clear().cursor(row, col).print(
      	lorem
      );

      if (++col === lcd.cols) {
        col = 0;

        if (++row === lcd.rows) {
          row = 0;
        }
      }
    });
  });
});
