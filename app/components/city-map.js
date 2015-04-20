import Ember from 'ember';
import {MAP_TYPES} from '../components/google-map';
import request from 'ic-ajax';

export default Ember.Component.extend({

  classNames: ['city-map'],

  type:        'road',
  mapTypes:    MAP_TYPES,

  map: null,

  roadsArray: function () {
    return Ember.A(this.get('roads'));
  }.property('roads'),

  rerenderPolylines: function () {
    this.set('roadsArray', []);
    this.getLoad();
  }.observes('displayedTime'),

  getLoad: function () {
    var date = this.get('displayedTime');

    var promises = this.get('roads').map(function (road) {
      return request({
        url: '/markers/%@/sample'.fmt(road.get('marker.id')),
        type: 'GET',
        data: {
          date: date
        },
        timeout: 3000
      }).then(function (response) {
        road.set('marker.current_load', response['load']);
        road.notifyPropertyChange('current_load');
      }).catch(function () {})
    })
    new Ember.RSVP.all(promises).then(function() {
      this.set('roadsArray', this.get('roads'));
    }.bind(this));
  }

});
