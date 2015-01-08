import Ember from 'ember';

export default Ember.View.extend({
	actions: {
		togglePhoneNumberList: function() {
			if(this.get("controller").get("model.phoneNumberList").length === 0) return;

			this.get("controller").toggleProperty("listVisible");
		},
		sendTestMessage: function(number) {
			if(!number) {
				bootbox.alert("Lütfen numara seçiniz!");
				return;
			}

			bootbox.alert("Test mesajı başarıyla gönderildi");
		}
	}
});
