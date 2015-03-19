import Ember from 'ember';
import d3 from '../../utils/d3';

export default Ember.ObjectController.extend({
  needs: ['cities'],

  names: Ember.computed.alias('controllers.cities.names'),
  currentCity: 'Warsaw',
// CHART
  timeSeriesBarContent: [],

  dayContent: Ember.computed.map('model.stats', function (stat) {
    return {
      time: d3.time.format.iso.parse(stat.get('time')),
      value: stat.get('value')
    };
  }),

  // filteredWeekStats: Ember.computed.filterBy('weekStats', function () {
  // }),

  weekContent: Ember.computed.map('weekStats', function (stat) {
    return {
      time: d3.time.format.iso.parse(stat.created_at),
      value: stat.weighted_mean
    };
  }),

  weekStats: [],

  dayChart: false,

  actions: {

    changeChart: function () {
      this.toggleProperty('dayChart');
    },

    changeCity: function (city) {
      this.set('dayChart', false);
      return this.transitionToRoute('cities.city', city);
    }
  }
});
