import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  cluesQueue: service(),
  model() {
    this.transitionTo('clues.clue', this.get('cluesQueue').get('nextId'));
  }
});
