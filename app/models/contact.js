import DS from 'ember-data';
import Serializable from 'kingmesaj/mixins/serializable';
import importValue from "kingmesaj/utils/import-value";
export default DS.Model.extend(Serializable, Ember.Validations.Mixin, {
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
    serialization: {
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
                labelPath: "customField.label",
                valuePath: "value",
                typePath: "customField.type",
                miscPath: "customField.id"
            }
        },
        importDynamicField: function(value, type, info) {
            this.store.find('custom-field', info).then(function(cf) {
                this.get("customFieldBindings").then(function(bindings) {
                    bindings.pushObject(this.store.createRecord("custom-field-binding", {
                        customField: cf,
                        value: importValue(value, type)
                    }));
                }.bind(this));
            }.bind(this));
        }
    },
    validations: {
        firstName: {
            presence: true
        },
        lastName: {
            presence: true
        },
        primaryPhoneNumber: {
            presence: true,
            format: {
                "with": /^^0?\s?\(?(\d{3})\)?\s?(\d{3})\s?(\d{2})\s?(\d{2})$/,
                message: 'Geçerli bir telefon giriniz'
            }
        },
        secondaryPhoneNumber: {
            presence: true,
            format: {
                "with": /^^0?\s?\(?(\d{3})\)?\s?(\d{3})\s?(\d{2})\s?(\d{2})$/,
                message: 'Geçerli bir telefon giriniz'
            }
        },
        primaryEmailAddress: {
            format: {
                "with": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Geçerli bir email adresi giriniz'
            }
        },
        secondaryEmailAddress: {
            format: {
                "with": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Geçerli bir email adresi giriniz'
            }
        }
    }
});
