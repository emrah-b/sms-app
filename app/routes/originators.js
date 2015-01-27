import Ember from 'ember';

export
default Ember.Route.extend({
    model: function() {
        return this.store.find("originator");
    },
    actions: {
        create: function() {
            var newTitle = this.controller.get("newItem");
            var that = this;

            if (newTitle == null || newTitle.trim().length === 0) {
                that.controller.set("errorText", "Bu alan boş olamaz");
                return;
            }
            if (newTitle.trim().length < 2) {
                that.controller.set("errorText", "Başlık çok kısa");
                return;
            }
            if (newTitle.trim().length > 20) {
                that.controller.set("errorText", "Başlık çok uzun");
                return;
            }
            if (newTitle.trim().search(/^[a-zA-Z0-9]{2,20}$/) === -1) {
                that.controller.set("errorText", "Girdiginiz baslik yalnizca harf ve sayilardan olusmali!");
                return;
            }


            this.store.filter('originator', function(orgtr) {
                return orgtr.get("title") === newTitle.trim();
            }).then(function(matchingOriginators) {
                if (matchingOriginators.get("length") > 0) {
                    that.controller.set("errorText", "Varolan bir basligi ekleyemezsiniz!");
                    return;
                }

                that.store.createRecord('originator', {
                    title: newTitle.trim().toUpperCase()
                }).save().then(function() {
                    that.toggleAdding();
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
        this.controller.set("errorText", undefined);
    },
    toggleAdding: function() {
        var adding = this.controller.get("adding") || false;
        this.clearNewItem();
        this.controller.set("adding", !adding);
    }
});
