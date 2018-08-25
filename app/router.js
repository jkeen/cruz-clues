import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('random', {path: "/clue/random"});
  this.route('about');
  this.route('clues', {path: 'clues'}, function() {
    this.route('clue', {path: '/:id'});
  });
});

export default Router;
