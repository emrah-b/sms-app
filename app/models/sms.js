import DS from 'ember-data';

export default DS.Model.extend({
	list: DS.attr('list'),
	originator: DS.belongsTo("originator")
});
