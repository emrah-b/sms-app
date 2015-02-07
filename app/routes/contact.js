import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        this.controller.set("model", model);
    },
    confirmDelete: false,
    actions: {
        close: function() {
            this.transitionTo('contacts');
        },
        toggleConfirmDelete: function() {
            this.get("controller").toggleProperty("confirmDelete");
        },
        delete: function() {
            this.get("controller").get("model").deleteRecord();
            this.transitionTo('contacts');
        }
    }
});
