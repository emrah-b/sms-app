import Ember from 'ember';
import ExportableMixin from 'kingmesaj/mixins/exportable';

module('ExportableMixin');

// Replace this with your real tests.
test('it works', function() {
  var ExportableObject = Ember.Object.extend(ExportableMixin);
  var subject = ExportableObject.create();
  ok(subject);
});
