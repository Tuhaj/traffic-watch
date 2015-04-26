import Ember from 'ember';
import request from 'ic-ajax';


export default Ember.Route.extend({

  model: function (params) {
    return this.modelFor('cities').findBy('name', params.name);
  }

});
