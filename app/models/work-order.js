import DS from 'ember-data';

export default DS.Model.extend({
  	list: DS.attr(),
  	sendDate: DS.attr('date'),
	originator: DS.belongsTo("originator"),
	content: DS.attr("string"),
	timeValidity: DS.attr("string"),
	sendMessagesPerMin: DS.attr("number")
});
