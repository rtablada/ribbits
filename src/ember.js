require('ember-metal');
require('ember-runtime');

var Observer = Ember.Object.extend({
	firstName: null,

	fullNameChanged: function() {
		console.log('changed');
	}.observes('firstName')
});

var person = Observer.create();

person.set('firstName', 'Hey');
person.set('firstName', 'Son');
