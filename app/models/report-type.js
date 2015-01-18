import DS from 'ember-data';

var ReportType =  DS.Model.extend({
	text: DS.attr(),
	code: DS.attr()
});

ReportType.reopenClass({
	FIXTURES: [
		{id: 1, text: "Tarihe göre SMS gönderimi", code: "tarih"},
		{id: 2, text: "Durum ve tarihe göre SMS gönderimi", code: "durum-tarih"},
		{id: 3, text: "Numaraya göre SMS gönderimi", code: "numara"}
	]
});

export default ReportType;


