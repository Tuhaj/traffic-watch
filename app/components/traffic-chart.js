import Ember from 'ember';
import d3 from '../utils/d3';

export default Ember.Component.extend({

  polishNames: Ember.computed.map('cities', function (city) {
    return city.get('polishName');
  }),

  currentCityName: function () {
    return this.get('currentCity.polishName');
  }.property('currentCity'),

  reloader: function () {
    var city = this.get('cities').findBy('polishName', this.get('currentCityName'));
    if(Ember.isBlank(this.get('currentCityName'))) {
      city = this.get('cities').findBy('polishName', 'Warszawa');
    }
    this.sendAction('changeCity', city.get('name'));
  }.observes('currentCityName').on('init'),

  classNames: ['chart-container', 'zoom'],

  hour: d3.time.format('%H')(new Date()),

  setHour: function() {
    return this.get('hour') + ':00';
  }.property('hour'),

  actions: {

    setDay: function (day) {
      this.sendAction('setDay', day);
    }

  }

});
