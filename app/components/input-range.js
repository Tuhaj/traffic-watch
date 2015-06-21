import Ember from 'ember';
import d3 from '../utils/d3';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['min', 'max', 'step', 'type', 'value', 'hour'],
  type: 'range',
  min: 0,
  max: 24,
  step: 1,

  input: function () {
    var value = this.get('element.value');
    this.set('value', value);
    this.send('setHour');
  },

  actions: {
    setHour: function () {
     this.sendAction('setHour', this.get('value'))
    }
  }
});
