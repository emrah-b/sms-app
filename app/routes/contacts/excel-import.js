import Ember from 'ember';
export default Ember.Route.extend({
    setupController: function(controller, model) {
        this.store.find('custom-field').then(function(customFields) {
            var contact = this.store.createRecord('contact');
            controller.set("emptyContact", contact);
            customFields.forEach(function(customField) {
                var binding = this.store.createRecord('custom-field-binding', {
                    customField: customField,
                    label: customField.get("label")
                })
                contact.get("customFieldBindings").then(function(bindings) {
                    bindings.pushObject(binding);
                });
            }.bind(this));
        }.bind(this));
        this._super(controller, model);
    },
    actions: {
        cancel: function() {
            Ember.$(".main").removeClass("fadeInRight").addClass("fadeOutRight");
            Ember.run.later(function() {
                this.transitionTo('contacts');
            }.bind(this), 300);
        },
        willTransition: function() {
            this.controller.set("step", 1);
        }
    }
});
