import EmberRouter from "@ember/routing/router";
import config from "./config/environment";
import { inject } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { get } from '@ember/object';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: inject(),
  metrics: inject(),
  fastboot: inject(),

  setTitle(title) {
    this.get('headData').set('title', title);
  },

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if (!get(this, 'fastboot.isFastBoot')) {
      scheduleOnce('afterRender', this, () => {
        const page = this.get('url');
        const title = this.getWithDefault('currentRouteName', 'unknown');

        get(this, 'metrics').trackPage({ page, title });
      });
    }
  }

});

Router.map(function() {
  this.route('random', {path: "/clues/random"});
  this.route('about');
  this.route('clues', {path: 'clues'}, function() {
    this.route('clue', {path: '/:id'});
  });
});

export default Router;
