import Ember from 'ember';
import ExportData from 'kingmesaj/utils/export-data';
export default Ember.Route.extend({
    setupController: function() {
        this.controller.set("content", {});
        this.controller.set("liste", this.store.find('custom-field'));
        this.controller.set("model", this.store.createRecord('test-model'));
    },
    actions: {
        printContact: function() {

            this.store.find('contact', 1).then(function(contact){
            	ExportData.exportToExcel([contact], "sdfsdf.xlsx");
            })
        }
    }
});
