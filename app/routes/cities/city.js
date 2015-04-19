import Ember from 'ember';
import request from 'ic-ajax';


export default Ember.Route.extend({

  model: function (params) {
    return this.modelFor('cities').findBy('name', params.name);
  },

  afterModel: function (model) {
    request({
      url: '/cities/%@/stats'.fmt(model.get('name')),
      type: 'GET',
      dataType: 'json'
    }).then(function (response) {
      this.controller.set('weekStats', response.stats);
    }.bind(this)).catch(function () {
    });
  }

});
