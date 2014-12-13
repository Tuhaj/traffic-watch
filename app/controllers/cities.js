import Ember from 'ember';

export default Ember.ArrayController.extend({

  names: Ember.computed.mapBy('model', 'name')

});
