import Ember from 'ember';
import Notify from 'ember-notify';


export
default Ember.Route.extend({
    model: function() {
        return this.store.find("originator");
    },
    actions: {
        create: function() {
            var newTitle = this.controller.get("newItem");
            var _self = this;

            this.store.filter('originator', function(orgtr) {
                return orgtr.get("title") === newTitle;
            }).then(function(matchingOriginators) {
                if (matchingOriginators.get("length") > 0) {
                    _self.controller.set("invalidTitle", true);
                    Notify.error("Varolan bir basligi ekleyemezsiniz!")
                    return;
                }
                if (newTitle == null || newTitle.search(/^[a-zA-Z0-9]{2,20}$/) === -1) {
                    _self.controller.set("invalidTitle", true);
                    Notify.error("Girdiginiz baslik yalnizca harf ve sayilardan olusmali!");
                    return;
                }

                _self.store.createRecord('originator', {
                    title: newTitle.toUpperCase()
                }).save().then(function() {
                    _self.toggleAdding();
                });
            });

        },
        delete: function(record) {
            record.deleteRecord();

            record.save();
        },
        toggleAdding: function() {
            this.toggleAdding();
        }
    },
    clearNewItem: function() {
        this.controller.set("newItem", "");
        this.controller.set("invalidTitle", false);
    },
    toggleAdding: function() {
        var adding = this.controller.get("adding") || false;
        this.clearNewItem();
        this.controller.set("adding", !adding);
    }
});
