import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function() {
        this.controller.set("content", {});
        this.controller.set("liste", [{
            id: 1,
            text: "Aman 1"
        }, {
            id: 2,
            text: "Aman 2"
        }, {
            id: 3,
            text: "Aman 3"
        }]);

        this.controller.set("model", this.store.createRecord('test-model'));
    }
});
