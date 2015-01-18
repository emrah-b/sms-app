import Ember from 'ember';
import TableUtilMixin from 'kingmesaj/mixins/table-util';

module('TableUtilMixin');

// Replace this with your real tests.
test('it works', function() {
  var TableUtilObject = Ember.Object.extend(TableUtilMixin);
  var subject = TableUtilObject.create();
  ok(subject);
});
