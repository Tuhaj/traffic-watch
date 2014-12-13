import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('dashboard', { path: '/' }, function () {
    this.resource('cities', { path: '/'}, function () {
      this.route('city', { path: '/:name'});
    });
  });
});

export default Router;
