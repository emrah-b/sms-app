import Ember from 'ember';

export function phoneNumber(input) {
    if (!input || !input.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/g)) return input;
    var groups = input.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/m);
    return "0 (" + groups[1] + ") " + groups[2] + " " + groups[3] + " " + groups[4];
}

export default Ember.Handlebars.makeBoundHelper(phoneNumber);
