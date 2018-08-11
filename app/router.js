import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("clue", { path: "/clue/:id" })
  this.route('random', {path: "/clue/random"});
});

export default Router;
