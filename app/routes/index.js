import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default Route.extend({
  fastboot: service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),
  headData: service(),

  afterModel() {
    if (!this.get('isFastBoot')) {
      this.transitionTo('random');
    }
    else {
      // This is what sharing the main link will show
      this.set('headData.title', "Cruz Clues");
      this.set('headData.image', null); // default
    }
  }
});
