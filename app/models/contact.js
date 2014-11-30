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

Contact.reopenClass({
    FIXTURES: [{
        id: 1,
        firstName: 'Ali',
        lastName: 'Demirkan',
        primaryPhoneNumber: '0530 487 54 32',
        secondaryPhoneNumber: '',
        primaryEmailAddress: 'ali.d@gmail.com',
        secondaryEmailAddress: '',
        dateOfBirth: '1984-07-31',
        address: 'Yenisehir cad. No: 23/12 Dikimevi/ANKARA',
        canReceiveMessages: false,
        groups: [1,3],
        customFieldBindings: [1,2]
    }, {
        id: 2,
        firstName: 'Zeynep',
        lastName: 'Demirkan',
        primaryPhoneNumber: '0530 487 54 32',
        secondaryPhoneNumber: '',
        primaryEmailAddress: 'ali.d@gmail.com',
        secondaryEmailAddress: '',
        dateOfBirth: '1984-07-31',
        address: 'Yenisehir cad. No: 23/12 Dikimevi/ANKARA',
        canReceiveMessages: false,
        groups: [1, 2]
    }, {
        id: 3,
        firstName: 'Mutlu',
        lastName: 'Demirkan',
        primaryPhoneNumber: '0530 487 54 32',
        secondaryPhoneNumber: '',
        primaryEmailAddress: 'ali.d@gmail.com',
        secondaryEmailAddress: '',
        dateOfBirth: '1984-07-31',
        address: 'Ataturk cad. No: 23/12 Cankaya/ANKARA',
        canReceiveMessages: true,
        groups: [2,4]
    }, {
        id: 4,
        firstName: 'Servet',
        lastName: 'Demirkan',
        primaryPhoneNumber: '0538 487 54 32',
        secondaryPhoneNumber: '',
        primaryEmailAddress: 'ali.d@gmail.com',
        secondaryEmailAddress: '',
        dateOfBirth: '1984-07-31',
        address: 'Reyhanli Sk. No: 23/4 Sarikamis/KARS',
        canReceiveMessages: false,
        groups: [1]
    }, {
        id: 5,
        firstName: 'Bilge',
        lastName: 'Kose',
        primaryPhoneNumber: '0 530 237 54 32',
        secondaryPhoneNumber: '',
        primaryEmailAddress: 'ali.d@gmail.com',
        secondaryEmailAddress: '',
        dateOfBirth: '1984-07-31',
        address: 'Yenisehir cad. No: 23/12 Dikimevi/ANKARA',
        canReceiveMessages: false,
        groups: []
    }]
});

export
default Contact;
