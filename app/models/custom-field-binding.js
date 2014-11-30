import DS from 'ember-data';

var  CustomFieldBinding = DS.Model.extend({
	customField: DS.belongsTo('custom-field', {async: true}),
	value: DS.attr('string')
});

CustomFieldBinding.reopenClass({
	FIXTURES: [
		{id: 1, customField: 2, value: "Sari"},
		{id: 2, customField: 1, value: "12/09/2011"}
	]
});

export default CustomFieldBinding;