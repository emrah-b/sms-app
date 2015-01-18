import Ember from 'ember';

export
default Ember.Route.extend({
	model: function() {
        return this.store.createRecord('contact');
    },
    actions: {
        willTransition: function(transition) {
            if (!confirm("Kişi kaydedilmedi, çıkmak istediğinize emin misiniz?")) {
                transition.abort();
                return false;

            } else {
                this.controller.get("model").rollback();
                return true;
            }

        }
    }
});
