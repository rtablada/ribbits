require('ember-metal');
require('ember-runtime');
var moment = require('moment');


var Timer = Ember.Object.extend({
  lcd: null,
	time: moment(),
  lcdTime: null,
  displayTime: null,
  format: 'hh:mm:ss A',

  updateTime: function() {
    this.set('time', moment());
  },

	displayTime: function() {
		return this.get('time').format(this.get('format'));
	}.property('time'),

	displayTimeDidUpdate: function() {
    if (this.get('displayTime') != this.get('lcdTime')) {
      this.set('lcdTime', this.get('displayTime'));
    }
  }.observes('displayTime'),

  updateLCDTime: function() {
		this.get('lcd').cursor(0, 0).print(this.get('lcdTime'));
	}.observes('lcdTime')
});


var five = require("johnny-five"),
  board, lcd;

board = new five.Board();

board.on("ready", function() {
  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
  });

  var timer = Timer.create({
  	lcd: lcd,
    format: 'hh:mm:ss:SS A'
  });

  this.loop(10, function() {
    timer.updateTime();
  });

  this.repl.inject({
    lcd: lcd
  });

});

