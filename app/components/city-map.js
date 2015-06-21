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
  }.observes('displayedTime', 'currentCity'),

  getStrokeColor: function (load) {
    if(load > 150) {
      return '#FF0000';
    } else if (load > 120) {
      return '#FFFF00';
    } else {
      return '#00FF00';
    }
  },

  setRoadColors: function (roads) {
    var getStrokeColor = this.getStrokeColor,
        roadsArray = roads.map(function (road) {
          var load = road.get('current_load');
          return {
            'strokeColor': getStrokeColor(load),
            'path': road.get('path')
          }
        })
    this.set('roadsArray', roadsArray);
  },

  setLoadForAllRoads: function (response) {
    var roads = this.get('roads');
    roads.forEach(function (road) {
      var roadId = road.get('marker.id');
      var load = response['load'][String(roadId)];
      road.set('current_load', load);
    })
    return roads;
  },

  timeStamp: function () {
    var time = this.get('displayedTime'),
        minutes = Math.floor(time.getMinutes() / 15) * 15;
    time.setSeconds(0);
    time.setMinutes(minutes);
    return time;
  },

  getLoad: function () {
    var time         = this.timeStamp(),
        cityName     = this.get('currentCity'),
        cache        = this.get('cache'),
        cacheId      = time + cityName,
        roads        = [];
    if(cache[cacheId]) {
      roads = cache[cacheId];
    } else {
      var promise = request({
        url: '/cities/%@/traffic'.fmt(cityName),
        data: {
          time: time
        }
      }).then(function (response) {
        roads = this.setLoadForAllRoads(response);
        cache[cacheId] = roads;
      }.bind(this)).catch(function () {})
      this.set('cache', cache);
    }
    if(promise)
      promise.then(function () {
        return this.setRoadColors(roads);
      }.bind(this))
    this.setRoadColors(roads);
  }

});
