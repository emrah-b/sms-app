import Ember from 'ember';

export default Ember.Controller.extend({
	steps: function() {
		return [
			{title: "Liste olusturma", description: "Liste olusturma", template: "sms/list"},
			{title: "Icerik olusturma", description: "Icerik olusturma", template: "sms/content"},
			{title: "Gelismis Secenekler", description: "Gelismis Secenekler", template: "sms/options"},
			{title: "Onay", description: "Test mesaji ve onay", template: "sms/confirm"}
		];
	}.property()
});
