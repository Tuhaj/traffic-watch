import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('serializer:application', 'ApplicationSerializer', {
});

test('it exists', function() {
  var serializer = this.subject();
  ok(serializer);
});
