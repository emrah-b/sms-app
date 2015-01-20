import DS from 'ember-data';

var ReportType =  DS.Model.extend({
	name: DS.attr(),
	groupedBy: DS.attr()
});

export default ReportType;


