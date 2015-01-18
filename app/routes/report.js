import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        start: "",
        end: ""
    },
    model: function(params) {
        return this.store.find('report-type', params.id);
    },
    actions: {
        didTransition: function() {
            this.controllerFor("reports").set("reportDetail", true);
        },
    }
});
