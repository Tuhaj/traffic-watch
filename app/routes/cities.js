import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find('city');
  },

  afterModel: function() {
    this.transitionTo('cities.city', 'Warsaw');
  }
});
