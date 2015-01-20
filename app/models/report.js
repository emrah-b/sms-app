import DS from 'ember-data';

export default DS.Model.extend({
	reportType: DS.belongsTo("report-type",{
		async: true
	}),
	generatedDate: DS.attr("date"),
	reportData: DS.attr()
});
