import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  current_load: DS.attr('number'),
  marker:       DS.belongsTo('marker'),
  points:       DS.hasMany('point'),

  path: Ember.computed.map('points', function (point) {
    return {
      lat: point.get('lat'),
      lng: point.get('lng')
    };
  })
});
