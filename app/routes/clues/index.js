import Route from '@ember/routing/route';
import { inject } from '@ember/service';
export default Route.extend({
  cluesQueue: inject(),
  model() {
    this.transitionTo('clues.clue', this.get('cluesQueue').get('nextId'));
  }
});
