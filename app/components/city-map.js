import Ember from 'ember';
import {MAP_TYPES} from '../components/google-map';

export default Ember.Component.extend({

  classNames: ['city-map'],

  type:        'road',
  mapTypes:    MAP_TYPES,

  rerenderPolylines: function () {
    this.rerender();
  }.observes('renderMap', 'day')

});
