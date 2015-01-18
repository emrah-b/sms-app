import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.createViewModel();
    },
    createViewModel: function() {
        return Ember.Object.create({
            list: Ember.A(),
            sendDate: null,
            originator: null,
            content: "",
            timeValidity: 30,
            sendMessagesPerMin: 0,
            addedGroups: null,
            addedContacts: null,
            selectedOriginator: null,
            message: null,
            phoneNumberList: null,
            validityList: [
                {id: "1", text:"1 gün"},
                {id: "7", text:"1 hafta"},
                {id: "30", text:"1 ay"},
                {id: "365", text:"1 yıl"}
            ],
            timeValidityText: null
        });
    },
    actions: {
        willTransition: function(transition) {
            if (this.controller.get('userHasEnteredData') && !confirm("Mesaj kaydedilmedi, çıkmak istediğinize emin misiniz?")) {
                transition.abort();
                return false;

            } else {
                this.controller.set("model", this.createViewModel());
                return true;
            }

        }
    }
});
