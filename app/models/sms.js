import DS from 'ember-data';

export default DS.Model.extend({
	transactionId: DS.attr(),
    status: DS.attr(),
    phoneNumber: DS.attr(),
    message: DS.attr(),
    createdAt: DS.attr("date"),
    originator: DS.belongsTo("originator"),
    timeValidity: DS.attr(),
    sendDate: DS.attr("date")
});
