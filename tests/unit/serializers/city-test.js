import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('serializer:city', 'CitySerializer', {
});

test('it exists', function() {
  var serializer = this.subject();
  ok(serializer);
});
