import Ember from 'ember';
import Notify from 'ember-notify';
import ExportData from 'kingmesaj/utils/export-data';
export
default Ember.ArrayController.extend({
    queryParams: ['currentPage'],
    filter: '',
    currentPage: 1,
    itemsPerPage: 10,
    pageList: function() {
        var array = [];
        for (var i = 1; i <= this.get("maxNumberOfPages"); i++) {
            array[i] = i;
        }
        return array;
    }.property("filteredContent.length"),
    maxNumberOfPages: function() {
        return Math.ceil(this.get("filteredContent.length") / this.itemsPerPage);
    }.property("filteredContent.length"),
    sliceStart: function() {
        if (this.currentPage === 1) return 0;
        return (this.currentPage - 1) * this.itemsPerPage;
    }.property("filteredContent.length", "currentPage"),
    sliceEnd: function() {
        if (this.currentPage * this.itemsPerPage > this.get("filteredContent.length")) return this.get("filteredContent.length");
        return (this.currentPage) * this.itemsPerPage;
    }.property("filteredContent.length", "currentPage"),
    changePage: function() {
        if (this.get("attemptedPage") < 1) return false;
        if ((this.get("attemptedPage") - 1) * this.itemsPerPage >= this.get("filteredContent.length")) return false;
        this.set("currentPage", this.get("attemptedPage"));
        return true;
    }.observes("attemptedPage"),
    slicedContent: function() {
        if (!this.get("filteredContent")) return Ember.A([]);
        return this.get("filteredContent").slice(this.get("sliceStart"), this.get("sliceEnd"));
    }.property("sliceStart", "sliceEnd"),
    selectedContent: function() {
        return this.get("arrangedContent").filterBy("selected", true);
    }.property('arrangedContent.@each.selected'),
    filteredContent: Ember.computed.defaultTo("arrangedContent"),
    filterContacts: function() {
        this.set("currentPage", 1);
        var filter = this.get('filter');
        var rx = new RegExp(filter, 'gi');
        this.set("filteredContent", this.get("arrangedContent").filter(function(contact) {
            var contactMatchesFilter = (contact.get('firstName') || "").match(rx) || (contact.get('lastName') || "").match(rx) || (contact.get('primaryPhoneNumber') || "").match(rx) || (contact.get('secondaryPhoneNumber') || "").match(rx);
            return contactMatchesFilter;
        }));
    }.observes("filter", "arrangedContent"),
    actions: {
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
            this.setProperties({
                'asc': {},
                'desc': {}
            });
            this.set("desc." + property, this.get("sortAscending"));
            this.set("asc." + property, !this.get("sortAscending"));
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
        setMultipleDeletion: function() {
            this.set("contactsToDelete", this.get("selectedContent"));
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
            this.set("close", true);
        },
        firstPage: function() {
            this.set("attemptedPage", 1);
        },
        prevPage: function() {
            this.set("attemptedPage", this.get("currentPage") - 1);
        },
        setPage: function(attemptedPage) {
            this.set("attemptedPage", attemptedPage);
        },
        nextPage: function() {
            this.set("attemptedPage", this.get("currentPage") + 1);
        },
        lastPage: function() {
            this.set("attemptedPage", this.get("maxNumberOfPages"));
        },
        exportToExcel: function() {
            ExportData.exportToExcel(this.get("arrangedContent"), "Kisiler.xlsx");
        }
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
    }.property('arrangedContent.@each.selected'),
});
