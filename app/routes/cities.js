import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find('city');
  },

  redirect: function() {
    this.transitionTo('cities.city', TrafficWatch.defaultcity);
  }
});
