require('ember-metal');
require('ember-runtime');
var moment = require('moment');


var Timer = Ember.Object.extend({
  lcd: null,
	time: moment(),

  updateTime: function() {
    this.set('time', moment());
  },

	displayTime: function() {
		return this.get('time').format('hh:mm:ss A');
	}.property('time'),

	timeRequiresUpdate: function() {
		this.get('lcd').clear().cursor(0, 0).print(this.get('displayTime'));
	}.observes('displayTime')
});


var five = require("johnny-five"),
  board, lcd;

board = new five.Board();

board.on("ready", function() {
  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
  });

  var timer = Timer.create({
  	lcd: lcd
  });

  this.loop(300, function() {
    timer.updateTime();
  });

  this.repl.inject({
    lcd: lcd
  });

});

