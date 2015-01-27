import DS from 'ember-data';

var Originator = DS.Model.extend(Ember.Validations.Mixin, {
	title: DS.attr('string'),
	approved: DS.attr(),
	approveDate: DS.attr("date"),
	approvalText: function(){
		var text = "Bu başlık henüz onaylanmamış";

		if(this.get("approved")) {
			text = "Onaylanma tarihi: " + moment(this.get("approvedDate")).format('LL');
		}

		return text;
	}.property("approved", "approveDate"),

	validations: {
		title: {
			presence: true,
			length: {
				minimum: 2,
				maximum: 20
			},
			format: {
				with: /^[a-zA-Z0-9]{2,20}$/,
				message: "Girdiginiz baslik yalnizca harf ve sayilardan olusmali!"
			}
		}
	}
});

Originator.reopenClass({
	FIXTURES: [
		{id:1, title: "BUYUK KAMPANYA", approved: true, approveDate: new Date(2014,12,10)},
		{id:2, title: "UYELIK", approved: true, approveDate: new Date(2014,12,10)},
		{id:3, title: "INDIRIM", approved: true, approveDate: new Date(2014,12,10)},
		{id:4, title: "DS DAMAT", approved: false}
	]
});

export default Originator;