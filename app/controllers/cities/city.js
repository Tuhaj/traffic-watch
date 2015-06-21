import Ember from 'ember';
import d3 from '../../utils/d3';
import request from 'ic-ajax';

export default Ember.ObjectController.extend({
  needs: ['cities'],

  names: Ember.computed.alias('controllers.cities.names'),
  cities: Ember.computed.alias('controllers.cities'),

  currentCity: Ember.computed.alias('model'),

  currentCityName: Ember.computed.alias('currentCity.name'),

// traffic-chart
  displayedTime: new Date(),

  weekStats: [],

  filteredWeekStats: Ember.computed.filter('weekStats', function (stat) {
    var date = stat.created_at,
        parsedDate = d3.time.format.iso.parse(date),
        format = d3.time.format("%a");

    return format(parsedDate) === format(this.get('displayedTime'));
  }),

  weekContent: Ember.computed.map('filteredWeekStats', function (stat) {
    return {
      time: d3.time.format.iso.parse(stat.created_at),
      value: parseInt(stat.weighted_mean)
    };
  }),

// city-map
  roads:  Ember.computed.mapBy('markers', 'polylines.firstObject'),

// concerning time setting

  getDayFromName: function (wantedDay) {
    var theDay = null;
    var weekFormat = d3.time.format("%a")
    var days = [
                this.dayAgo(1),
                this.dayAgo(2),
                this.dayAgo(3),
                this.dayAgo(4),
                this.dayAgo(5),
                this.dayAgo(6),
                this.dayAgo(7)
              ]
    days.forEach(function (day){
      if(weekFormat(day) == wantedDay) {
         theDay = day;
      }
    });
    return theDay;
  },

  dayAgo: function (day) {
    var now = new Date();
    var xDaysAgo = now.getDate() - day;
    return new Date(now.setDate(xDaysAgo));
  },

  getMidnightOf: function (day) {
    var hours = day.getHours() * 60 * 60 * 1000,
        minutes = day.getMinutes() * 60 * 1000;
    return new Date(day - hours - minutes);
  },

  actions: {

    getStats: function (city) {
      request({
        url: '/cities/%@/stats'.fmt(city),
        type: 'GET',
        dataType: 'json'
      }).then(function (response) {
        this.set('weekStats', response.stats);
      }.bind(this)).catch(function () {
      });
    },

    changeCity: function (city) {
      this.send('getStats', city);
      var city = this.get('cities').findBy('name', city);
      this.transitionToRoute('cities.city', city);
      this.set('content', city);
    },

    setDay: function (day) {
      var dayToSet = this.getDayFromName(day)
      this.set('displayedTime', dayToSet);
      this.notifyPropertyChange('weekStats');
    },

    setHour: function (hour) {
      var time = this.get('displayedTime');
      if(time.getDate() == (new Date).getDate()) {
        time = this.dayAgo(7);
      }
      var wantedTime = this.getMidnightOf(time);
      if(hour === 24) {
        wantedTime.setHours(23);
        wantedTime.setMinutes(55);
      } else {
        wantedTime.setHours(hour);
      }
      this.set('displayedTime', wantedTime);
    }
  }
});
