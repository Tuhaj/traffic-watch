import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['min', 'max', 'step', 'type'],
  type: 'range',
  min: 0,
  max: 24,
  step: 1,

  change: function() {
    var value = this.$()[0].value;
    this.set('value', +value);
  }
});
