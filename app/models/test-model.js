import DS from 'ember-data';

export default DS.Model.extend(Ember.Validations.Mixin, {
  firstName: DS.attr(),
  lastName: DS.attr(),
  email: DS.attr(),
  phone: DS.attr(),
  age: DS.attr("number"),
  chosenItem: DS.attr(),
  dateOfBirth: DS.attr("date"),

  validations: {
    firstName: {
      presence: true
    },
    lastName: {
      presence: true
    },
    email: {
      presence: true,
      format: {
        "with": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        allowBlank: true,
        message: 'Geçerli bir email adresi giriniz'
      }
    },
    age: {
      presence: true,
      numericality: {
        allowBlank: true,
        onlyInteger: true,
        greaterThan: 5,
        lessThan: 80
      }
    },
    dateOfBirth: {
    	presence: true
    },
    phone: {
      presence: true
    }
  }
});
