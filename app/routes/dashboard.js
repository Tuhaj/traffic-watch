import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    this.transitionTo('cities.city', 'Warsaw');
  }

});
