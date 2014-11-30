import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Component.extend({
    filter: '',
    filterContacts: function() {
        var filter = this.get('filter');
        var rx = new RegExp(filter, 'gi');

        this.set("filteredContacts", this.get("contacts").filter(function(contact) {
            var contactMatchesFilter = (contact.get('firstName') || "").match(rx) ||
                (contact.get('lastName') || "").match(rx) ||
                (contact.get('primaryPhoneNumber') || "").match(rx) ||
                (contact.get('secondaryPhoneNumber') || "").match(rx);

            return contactMatchesFilter;
        }));

    }.observes("filter", "contacts"),
    filteredContacts: Ember.computed.defaultTo("contacts"),
    hasValidGroup: function() {
        return this.get("group") != null;
    }.property("group"),
    actions: {
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        },
        confirmDeletion: function(contact) {
            var _this = this;
            bootbox.confirm("Kişiyi gruptan silmek istediginize emin misiniz?", function(result) {
                if(!result) return;

                _this.deleteContact(contact);
            });
        }
    },
    deleteContact: function(contact) {
        this.get("group").get("contacts").removeObject(contact);
        this.get("group").save();
        contact.save();

        Notify.success("Secilen kişi silindi");
    }
});
