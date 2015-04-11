import DS from 'ember-data';

export default DS.Model.extend({

  name:       DS.attr('string'),
  center:     DS.attr('string'),
  zoom:       DS.attr('number'),
  markers:    DS.hasMany('marker'),
  stats:      DS.hasMany('stat', {async: true}),

  polylines:  Ember.computed.mapBy('markers', 'polylines.firstObject'),

  lat: function () {
    return this.get('center').split(',')[0];
  }.property('center'),

  lng: function () {
    return this.get('center').split(',')[1];
  }.property('center')

});
