import Ember from 'ember';
import {MAP_TYPES} from '../components/google-map';
import request from 'ic-ajax';

export default Ember.Component.extend({

  classNames: ['city-map'],

  type:        'road',
  mapTypes:    MAP_TYPES,

  map: null,

  cache: {},

  roadsArray: [],

  rerenderPolylines: function () {
    this.set('roadsArray', []);
    this.getLoad();
  }.observes('displayedTime', 'currentCity').on('didInsertElement'),

  getStrokeColor: function (load) {
    if(load > 150) {
      return '#FF0000';
    } else if (load > 120) {
      return '#FFFF00';
    } else {
      return '#00FF00';
    }
  },

  setRoads: function () {
    var roads = this.get('roads'),
        getStrokeColor = this.getStrokeColor,
        roadsArray = roads.map(function (road) {
          var load = road.get('current_load');
          return {
            'strokeColor': getStrokeColor(load),
            'path': road.get('path')
          }
        })
    this.set('roadsArray', roadsArray);
  },

  getLoad: function () {
    var date        = this.get('displayedTime'),
        cityName    = this.get('currentCity'),
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
          road.set('current_load', load);
        }).catch(function () {})
      })
      new Ember.RSVP.all(promises).then(function() {
        this.setRoads();
        cache[cacheId] = cachedLoads;
        this.set('cache', cache);
      }.bind(this));

    } else {
      var promises = this.get('roads').map(function (road) {
        var load = cache[cacheId][road.id];
        road.set('current_load', load);
      })

      new Ember.RSVP.all(promises).then(function() {
        this.setRoads();
      }.bind(this));
    }
  }

});
