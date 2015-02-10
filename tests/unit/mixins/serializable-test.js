import Ember from 'ember';
import SerializableMixin from 'kingmesaj/mixins/serializable';

module('SerializableMixin');

// Replace this with your real tests.
test('it works', function() {
  var SerializableObject = Ember.Object.extend(SerializableMixin);
  var subject = SerializableObject.create();
  ok(subject);
});
