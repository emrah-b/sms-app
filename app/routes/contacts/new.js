import Ember from 'ember';

export
default Ember.Route.extend({
	model: function() {
        return this.store.createRecord('contact');
    },

    setupController: function(controller, model) {
        controller.set('contact', model);
    },
});
