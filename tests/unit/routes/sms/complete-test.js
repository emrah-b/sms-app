import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:sms/complete', 'SmsCompleteRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function() {
  var route = this.subject();
  ok(route);
});
