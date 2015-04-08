import Ember from 'ember';
import d3 from '../utils/d3';

export default Ember.Component.extend({

  nameTranslation: {
    'Warsaw': 'Warszawa',
    'Wroclaw': 'Wrocław',
    'Krakow': 'Kraków',
    'Poznan': 'Poznań',
    'Bydgoszcz': 'Bydgoszcz',
    'Bialystok': 'Białystok',
    'Gorzow Wielkopolski': 'Gorzów Wielkopolski',
    'Kielce': 'Kielce',
    'Lublin': 'Lublin',
    'Lodz': 'Łódź',
    'Olsztyn': 'Olsztyn',
    'Opole': 'Opole',
    'Rzeszow': 'Rzeszów',
    'Szczecin': 'Szczecin',
    'Torun': 'Toruń',
    'Gdansk': 'Gdańsk',
    'Katowice': 'Katowice'
  },

  currentCityValue: {'Warszawa':'Warsaw','Wrocław':'Wroclaw','Kraków':'Krakow','Poznań':'Poznan','Bydgoszcz':'Bydgoszcz','Białystok':'Bialystok','Gorzów Wielkopolski':'Gorzow Wielkopolski','Kielce':'Kielce','Lublin':'Lublin','Łódź':'Lodz','Olsztyn':'Olsztyn','Opole':'Opole','Rzeszów':'Rzeszow','Szczecin':'Szczecin','Toruń':'Torun','Gdańsk':'Gdansk','Katowice':'Katowice'},

  polishNames: Ember.computed.map('names', function (name) {
    return this.get('nameTranslation')[name];
  }),

  currentCityName: function () {
    return this.get('nameTranslation')[this.get('currentCity')];
  }.property('currentCity'),

  reloader: function () {
    var city = this.get('currentCityValue')[this.get('currentCityName')];
    this.sendAction('changeCity', city);
  }.observes('currentCityName').on('init'),

  classNames: ['chart-container', 'zoom'],

  timeSeriesBarContent: [],

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
