import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function() {
        this.controller.set("content", {});
        this.controller.set("liste", 
            this.store.find('custom-field')
        );

        this.controller.set("model", this.store.createRecord('test-model'));
    }
});
