import DS from 'ember-data';

var Contact = DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    primaryPhoneNumber: DS.attr('string'),
    secondaryPhoneNumber: DS.attr('string'),
    primaryEmailAddress: DS.attr('string'),
    secondaryEmailAddress: DS.attr('string'),
    dateOfBirth: DS.attr("date"),
    address: DS.attr('string'),
    canReceiveMessages: DS.attr('boolean', {
        defaultValue: true
    }),
    groups: DS.hasMany('group', {
        async: true
    }),
    customFieldBindings: DS.hasMany('custom-field-binding', {
        async: true
    }),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')
});



export
default Contact;
