import DS from 'ember-data';

var Originator = DS.Model.extend({
	title: DS.attr('string')
});

Originator.reopenClass({
	FIXTURES: [
		{id:1, title: "BUYUK KAMPANYA"},
		{id:2, title: "UYELIK"},
		{id:3, title: "INDIRIM"},
		{id:4, title: "DS DAMAT"}
	]
});

export default Originator;