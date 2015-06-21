import Ember from 'ember';
import d3 from '../utils/d3';

export default Ember.Component.extend({
  reloader: function () {
    this.sendAction('changeCity', this.get('currentCityName'));
  }.observes('currentCityName').on('init'),

  classNames: ['chart-container', 'zoom'],

  hour: function () {
    return d3.time.format('%H')(this.get('displayedTime'));
  }.property('displayedTime'),


  displayedHour: function() {
    return this.get('hour') + ':00';
  }.property('hour', 'displayedTime'),

  actions: {

    setDay: function (day) {
      this.sendAction('setDay', day);
    },

    setHour: function (hour) {
      this.sendAction('setHour', hour);
    }

  }

});
