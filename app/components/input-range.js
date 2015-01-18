import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['min', 'max', 'step', 'type'],
  type: 'range',
  min: 0,
  max: 10,
  step: 1,
  change: function() {
    var value = this.get('element.value');
    this.set('value', +value);
  }
});