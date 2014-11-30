import Ember from 'ember';
import Notify from 'ember-notify';

export
default Ember.Controller.extend({
    _groups: function() {
        return this.store.findAll("group");
    }.property(),
    _customFields: function() {
        return this.store.find("custom-field");
    }.property(),
    groupsContent: function() {
        return this.get("_groups").map(function(i) {
            return Ember.Object.create({
                id: i.get("id"),
                text: i.get("name")
            });
        });
    }.property("_groups.@each"),
    customFieldBindings: function() {
        return this.get("_customFields").map(function(i) {
            return {
                customField: i,
                value: ""
            };
        });
    }.property("_customFields.@each"),
    updateGroupMemberships: function() {
        var contact = this.get("contact");
        var groups = this.get("memberOf");
        var _self = this;
        if (groups) {
            groups.forEach(function(group) {
                contact.get("groups").then(function(groups) {
                    _self.store.find('group', group.get("id")).then(function(groupToPush) {
                        groups.pushObject(groupToPush);
                        contact.save();
                    });
                });
            });
        }

        contact.save();

    }.observes('memberOf.@each'),
    updateCustomFieldBindings: function() {

    }.observes("customFieldBindings.@each.value"),
    actions: {
        createContact: function() {
            var contact = this.get("contact");
            var customFieldBindings = this.get("customFieldBindings");
            var _self = this;

            if (customFieldBindings) {
                customFieldBindings.forEach(function(customFieldBinding) {
                    contact.get("customFieldBindings").then(function(customFieldBindings) {
                        var binding = _self.store.createRecord('custom-field-binding', customFieldBinding);
                        customFieldBindings.pushObject(binding);
                        contact.save();
                    });
                });
            }

            contact.save().then(function() {

                Notify.success('Kisi basariyla olusturuldu');
                _self.transitionToRoute('contacts');
            });

        }
    }
});
