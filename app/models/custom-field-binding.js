import DS from 'ember-data';

var  CustomFieldBinding = DS.Model.extend({
	customField: DS.belongsTo('custom-field', {async: true}),
	value: DS.attr('string')
});

export default CustomFieldBinding;