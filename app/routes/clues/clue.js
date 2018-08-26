import Route from '@ember/routing/route';
import {inject } from '@ember/service';
import RSVP from 'rsvp';
export default Route.extend({
  cluesQueue: inject(),
  init() {
    this._super(...arguments);
  },
  model(params) {
    let currentId = params.id
    let queue = this.get('cluesQueue');
    queue.set('currentId', currentId);

    return RSVP.hash({
      // allClues: this.store.peekAll('clue'),
      currentClue: this.store.loadRecord('clue', currentId),
      // nextClue: this.store.peekRecord('clue', this.get('cluesQueue').get('nextId'))
    })
  }
});
