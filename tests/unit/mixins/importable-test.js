import Ember from 'ember';
import ImportableMixin from 'kingmesaj/mixins/importable';

module('ImportableMixin');

// Replace this with your real tests.
test('it works', function() {
  var ImportableObject = Ember.Object.extend(ImportableMixin);
  var subject = ImportableObject.create();
  ok(subject);
});
