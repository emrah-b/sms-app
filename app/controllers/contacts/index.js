import Ember from 'ember';
import Notify from 'ember-notify';

export
default Ember.ArrayController.extend({
    filter: '',
    selectedContent: function() {
        return this.get("arrangedContent").filterBy("selected", true);
    }.property('arrangedContent.@each.selected'),
    filteredContent: Ember.computed.defaultTo("arrangedContent"),
    filterContacts: function() {
        var filter = this.get('filter');
        var rx = new RegExp(filter, 'gi');

        this.set("filteredContent", this.get("arrangedContent").filter(function(contact) {
            var contactMatchesFilter = (contact.get('firstName') || "").match(rx) ||
                (contact.get('lastName') || "").match(rx) ||
                (contact.get('primaryPhoneNumber') || "").match(rx) ||
                (contact.get('secondaryPhoneNumber') || "").match(rx);

            return contactMatchesFilter;
        }));

    }.observes("filter", "arrangedContent"),
    actions: {
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        },
        selectAll: function() {
            this.get("arrangedContent").forEach(function(item) {
                item.set("selected", true);
            });
        },
        clearSelection: function() {
            this.get("arrangedContent").forEach(function(item) {
                item.set("selected", false);
            });
        },
        setContactForModal: function(toggler) {
            this.set("confirmSingleDelete", false);
            this.set("selectedContact", toggler.get("contact"));
        },
        setMultipleDeletion: function() {
            this.set("contactsToDelete", this.get("selectedContent"));
        },
        setSingleDeletion: function() {
            this.set("confirmSingleDelete", true);
            this.set("contactsToDelete", [this.get("selectedContact")]);
        },
        cancelConfirmSingleDelete: function() {
            this.set("confirmSingleDelete", false);
            this.set("contactsToDelete", []);
        },
        deleteSelected: function() {
            var contacts = this.get("contactsToDelete");
            if (!contacts) {
                this.set("close", true);
                return;
            }

            contacts.forEach(function(contact) {
                this.removeObject(contact);
                contact.deleteRecord();
                contact.save();
            }, this);

            Notify.success("Secilen kisiler silindi");

            this.set("contactsToDelete", []);
            this.set("confirmSingleDelete", false);
            this.set("close", true);
        },
    },
    reloadFilter: function() {

        // stupid hack to get the array to refresh
        var currFilter = this.get("filter");
        this.set("filter", currFilter + "-");
        this.set("filter", currFilter);
    }.observes("content.@each"),
    allSelected: function() {
        return this.get("arrangedContent").every(function(i) {
            return i.selected;
        });
    }.property('arrangedContent.@each.selected'),
    someSelected: function() {
        return this.get("selectedContent").length > 0;

    }.property('arrangedContent.@each.selected')
});
