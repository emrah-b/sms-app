import Ember from 'ember';

export function fieldAccess(input) {
    var record = arguments[0];
    var columnName = arguments[1];
    return new Ember.Handlebars.SafeString(record[columnName]);
};

export default Ember.Handlebars.makeBoundHelper(fieldAccess);
