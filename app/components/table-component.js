import Ember from 'ember';

export default Ember.Component.extend({
	queryParams: ["currentPage"],
	pagination: true,
    searchBar: false,
    sorting: true,
    itemsPerPage: 12,
    currentPage: 1,
    asc: {},
    dsc: {},
    data: function() {
        return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        	content: this.get("list")
        })
    }.property("list"),
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
    }.property("filteredContent", "sliceStart", "sliceEnd"),
    filteredContent: Ember.computed.defaultTo("data.arrangedContent"),
    filterContent: function() {
        this.set("currentPage", 1);

        var filter = this.get('filter');
        // var rx = new RegExp(filter, 'gi');

        this.set("filteredContent", this.get("data.arrangedContent"));
        // .filter(function(item) {
        //     var itemMatchesFilter = (item.get('firstName') || "").match(rx) ||
        //         (item.get('lastName') || "").match(rx) ||
        //         (item.get('primaryPhoneNumber') || "").match(rx) ||
        //         (item.get('secondaryPhoneNumber') || "").match(rx);

        //     return itemMatchesFilter;
        // }));

    }.observes("filter", "data.arrangedContent"),
    actions: {
        sortBy: function(property) {
            this.set('data.sortProperties', [property]);
            this.set('data.sortAscending', !this.get('data.sortAscending'));
            this.setProperties({
                'asc': {},
                'desc': {}
            });
            this.set("desc." + property, this.get("data.sortAscending"));
            this.set("asc." + property, !this.get("data.sortAscending"));
            return true;
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
        }
    }
});
