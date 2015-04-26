import Ember from 'ember';
import {MAP_TYPES} from '../components/google-map';
import request from 'ic-ajax';

export default Ember.Component.extend({

  classNames: ['city-map'],

  type:        'road',
  mapTypes:    MAP_TYPES,

  map: null,

  cache: {},

  roadsArray: function () {
    return Ember.A(this.get('roads'));
  }.property('roads'),

  rerenderPolylines: function () {
    this.set('roadsArray', []);
    this.getLoad();
  }.observes('displayedTime', 'currentCity'),

  getLoad: function () {
    var date        = this.get('displayedTime'),
        cityName     = this.get('currentCity'),
        cache       = this.get('cache'),
        cachedLoads = {},
        cacheId     = date + cityName;

    if(cache[cacheId] === undefined) {

      var promises = this.get('roads').map(function (road) {

        return request({
          url: '/markers/%@/sample'.fmt(road.get('marker.id')),
          data: {
            date: date
          },
          timeout: 3000
        }).then(function (response) {
          var load = response['load'];
          cachedLoads[road.id] = load;
          road.set('marker.current_load', load);
          road.notifyPropertyChange('current_load');
        }).catch(function () {})
      })
      new Ember.RSVP.all(promises).then(function() {
        this.set('roadsArray', this.get('roads'));
        cache[cacheId] = cachedLoads;
        this.set('cache', cache);
      }.bind(this));

    } else {
      var promises = this.get('roads').map(function (road) {
        var load = cache[cacheId][road.id];
        road.set('marker.current_load', load);
        road.notifyPropertyChange('current_load');
      })

      new Ember.RSVP.all(promises).then(function() {
        this.set('roadsArray', this.get('roads'));
      }.bind(this));
    }
  }

});
