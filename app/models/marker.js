import DS from 'ember-data';

export default DS.Model.extend({

  lat:                    DS.attr('string'),
  lng:                    DS.attr('string'),
  city:                   DS.belongsTo('city'),
  current_load:           DS.attr('number'),
  polylines:              DS.hasMany('polyline')

});
