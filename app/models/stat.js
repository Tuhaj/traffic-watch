import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  created_at:    DS.attr('string'),
  weighted_mean: DS.attr('string'),
  city:          DS.belongsTo('city'),

  time:          Ember.computed.alias('created_at'),
  value:         Ember.computed.alias('weighted_mean')

});
