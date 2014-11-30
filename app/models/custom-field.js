import DS from 'ember-data';

var CustomField = DS.Model.extend({
    label: DS.attr("string"),
    type: DS.attr("string")
});

CustomField.reopenClass({
	FIXTURES: [
		{id: 1, label: "Evlilik Yildonumu", type: "date"},
		{id: 2, label: "En Sevdigi Renk", type: "text"}

	]
});

export default CustomField;
