import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  marker:    DS.belongsTo('marker'),
  points:    DS.hasMany('point'),

  current_load: Ember.computed.alias('marker.current_load'),

  strokeColor: Ember.computed('current_load', function () {
    var percentage = this.get('current_load')
    if(percentage > 150) {
      return '#FF0000';
    } else if (percentage > 120) {
      return '#FFFF00';
    } else {
      return '#00FF00';
    }
  }),

  path: Ember.computed.map('points', function (point) {
    return {
      lat: point.get('lat'),
      lng: point.get('lng')
    };
  })
});
