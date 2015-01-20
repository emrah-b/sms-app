import Ember from 'ember';

export function smsStatus(input) {
    switch (input) {
        case 0:
            return new Ember.Handlebars.SafeString("<span class='label label-success' style='width: 85px'>BAŞARILI</span>");
        case 1:
            return new Ember.Handlebars.SafeString("<span class='label label-danger' style='width: 85px'>BAŞARISIZ</span>");
        case 2:
            return new Ember.Handlebars.SafeString("<span class='label label-info' style='width: 85px'>BEKLEMEDE</span>");
        default:
        	return input;
    }
}

export default Ember.Handlebars.makeBoundHelper(smsStatus);
