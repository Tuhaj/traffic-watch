import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:application', 'ApplicationAdapter', {
  needs: ['serializer:city', 'serializer:marker']
});

test('it exists', function() {
  var adapter = this.subject();
  ok(adapter);
});
