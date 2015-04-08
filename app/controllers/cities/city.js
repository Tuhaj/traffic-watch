import Ember from 'ember';
import d3 from '../../utils/d3';
import request from 'ic-ajax';

export default Ember.ObjectController.extend({
  needs: ['cities'],

  names: Ember.computed.alias('controllers.cities.names'),
  currentCity: 'Warsaw',

// traffic-chart
  timeSeriesBarContent: [],

  day: d3.time.format("%a")(new Date()),

  filteredWeekStats: Ember.computed.filter('weekStats', function (stat) {
    var date = stat.created_at,
        parsedDate = d3.time.format.iso.parse(date),
        format = d3.time.format("%a");

    return format(parsedDate) === this.get('day');
  }),

  weekContent: Ember.computed.map('filteredWeekStats', function (stat) {
    return {
      time: d3.time.format.iso.parse(stat.created_at),
      value: parseInt(stat.weighted_mean)
    };
  }),

// input-range
  xPosition: d3.time.format("%H")(new Date()),

// city-map
  renderMap: null,

  getLoad: function () {
    var date = this.getDate();
    var promises = this.get('polylines').map(function (polyline) {
      return request({
        url: '/markers/%@/sample'.fmt(polyline.get('marker.id')),
        type: 'GET',
        data: {
          date: date
        }
      }).then(function (response) {
        polyline.get('marker').set('current_load', response['load']);
        polyline.notifyPropertyChange('current_load');
      }).catch(function () {})
    })
    new Ember.RSVP.all(promises).then(function() {
      this.set('renderMap', this.get('xPosition'));
    }.bind(this));
  },

  getDate: function () {
    var wantedTime = this.get('filteredWeekStats.firstObject.created_at');
    if(Ember.isBlank(wantedTime)) {
      wantedTime = new Date();
      var sevenDaysAgo = wantedTime.getDate() - 7;
      wantedTime = new Date(wantedTime.setDate(sevenDaysAgo));
      wantedTime = new Date(wantedTime.setHours(0));
      wantedTime = new Date(wantedTime.setMinutes(0));
    }
    var midnightDate = new Date(wantedTime);
    var hour = this.get('xPosition');
    var dateInNumber = midnightDate.setHours(hour);
    var date = new Date(dateInNumber);
    return date;
  },

  setPolylinesTraffic: function () {
    this.getLoad()
  }.observes('xPosition'),

  weekStats: [],

  actions: {

    changeCity: function (city) {
      return this.transitionToRoute('cities.city', city);
    },

    setDay: function (day) {
      this.set('day', day);
      this.notifyPropertyChange('weekStats');
      this.notifyPropertyChange('xPosition');
    }
  }
});
