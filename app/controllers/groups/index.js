import Ember from 'ember';
import Notify from "ember-notify";

export default Ember.ArrayController.extend({
    filter: '',
    allContacts: function() {
        return this.store.find("contact");
    }.property(),
    actions: {
        selectGroup: function(group) {
            this.set("selectedGroup", group);
        },
        newGroup: function() {
            var _this = this;
            bootbox.prompt("Yeni grubun ismini giriniz", function(result) {
                if (result === null || result === "") return;

                 _this.store.createRecord('group', {
                    name: result
                }).save().then(function() {
                    Notify.success("Grup basarıyla tanımlandı");
                });
            });
        },
        confirmDeleteGroup: function() {
            var _this = this;
            bootbox.confirm("Grubu silmek istediğinize emin misiniz?", function(result){
                if(!result) return;
                if(!_this.get("selectedGroup")) {
                    Notify.warning("Grup bulunamadi");
                    return;
                }

                _this.get("selectedGroup").deleteRecord();
                _this.get("selectedGroup").save();

                Notify.success("Grup silindi");
            })
        }
    }
});
