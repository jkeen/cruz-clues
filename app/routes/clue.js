import Route from '@ember/routing/route';
import RSVP from 'rsvp';
export default Route.extend({
  model(id) {
    return RSVP.hash({
      clue: this.store.find('clue', id)
    });
  }
});
