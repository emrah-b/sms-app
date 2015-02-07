import DS from 'ember-data';
import ExportableMixin from 'kingmesaj/mixins/exportable';

var printPhoneNumber = function(input) {
    if (!input || !input.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/g)) return input;
    var groups = input.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/m);
    return "0 (" + groups[1] + ") " + groups[2] + " " + groups[3] + " " + groups[4];
};

export default DS.Model.extend(ExportableMixin, {
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
        async: true,
    }),
    customFieldBindings: DS.hasMany('custom-field-binding', {
        async: true
    }),
    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),
    export: {
        fields: {
            firstName: {
                label: "Adı"
            },
            lastName: {
                label: "Soyadı"
            },
            primaryPhoneNumber: {
                label: "Telefon",
                type: "phone-number"
            },
            secondaryPhoneNumber: {
                label: "2. Telefon",
                type: "phone-number"
            },
            primaryEmailAddress: {
                label: "E-Mail"
            },
            secondaryEmailAddress: {
                label: "2.E-Mail"
            },
            dateOfBirth: {
                label: "Doğum Tarihi",
                type: "date"
            },
            address: {
                label: "Adres"
            },
            canReceiveMessages: {
                label: "Mesaja Açık",
                type: "bool"
            }
        },
        dynamicFields: {
            customFieldBindings: {
                labelPath: "label",
                valuePath: "value",
            }
        }
    }
});
