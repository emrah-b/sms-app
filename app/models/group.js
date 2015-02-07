import DS from 'ember-data';

var Group = DS.Model.extend({
    name: DS.attr('string'),
    contacts: DS.hasMany("contact"),
    domIdSelector: function() {
        return "#group" + this.get("id");
    }.property('id'),
    domId: function() {
        return "group" + this.get("id");
    }.property('id'),



    destroyWithContacts: function() {
        var length = this.get("contacts").get("length");
        for (var i = 0; i < length; i++) {
            this.get("contacts").popObject().destroyRecord();
        }

        return this.destroyRecord();

    }
});


Group.reopenClass({
    FIXTURES: [{
        id: 1,
        name: "Ust musteri segmenti"
    }, {
        id: 2,
        name: "Orta musteri segmenti"
    }, {
        id: 3,
        name: "Alt musteri segmenti"
    }, {
        id: 4,
        name: "Kisisel uyeler"
    }]
});

export
default Group;
