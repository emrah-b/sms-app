import DS from 'ember-data';

var  CustomFieldBinding = DS.Model.extend({
	customField: DS.belongsTo('custom-field', {async: true}),
	type: DS.attr("string"),
	label: DS.attr("string"),
	value: DS.attr('string')
});

export default CustomFieldBinding;