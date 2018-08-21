import Route from '@ember/routing/route';
import {inject } from '@ember/service';
import RSVP from 'rsvp';
export default Route.extend({
  cluesQueue: inject(),
  model(params) {
    let currentId = params.id
    let queue = this.get('cluesQueue');
    queue.set('currentId', currentId);

    return RSVP.hash({
      currentClue: this.store.peekRecord('clue', currentId),
      nextClue: this.store.peekRecord('clue', this.get('cluesQueue').get('nextId'))
    })
  },
  afterModel(model) {
    this.get('cluesQueue').markClueSeen(model.currentClue.id);
  }
});
