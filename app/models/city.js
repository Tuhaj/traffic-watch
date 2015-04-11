import DS from 'ember-data';

export default DS.Model.extend({

  name:       DS.attr('string'),
  center:     DS.attr('string'),
  zoom:       DS.attr('number'),
  markers:    DS.hasMany('marker'),
  stats:      DS.hasMany('stat', {async: true}),

  lat: function () {
    return this.get('center').split(',')[0];
  }.property('center'),

  lng: function () {
    return this.get('center').split(',')[1];
  }.property('center'),

  polishName: function () {
    return this.get('nameTranslation')[this.get('name')];
  }.property('name'),

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

});
