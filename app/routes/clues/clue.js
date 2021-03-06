import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { get } from '@ember/object';
export default Route.extend({
  cluesQueue: service(),
  headData  : service(),
  metrics   : service(),

  titleToken: function(model) {
    return model.currentClue.get('title');
  },

  model(params) {
    let currentId = params.id
    let queue = this.get('cluesQueue');
    return RSVP.hash({
      currentClue: queue.load(currentId),
    })
  },

  afterModel(model) {
    this.controllerFor('clues').set('onLastClue', this.get('cluesQueue.onLastClue'));
    this.controllerFor('clues').set('isLoading', false);

    let clue = model.currentClue;
    this.set('headData.title', clue.get('title'));
    let clueImage = (get(clue, 'imageUrl') || get(clue, 'embed.thumbnail_url'));
    if (clueImage) {
      this.set('headData.image', clueImage);
    }
    else {
      this.set('headData.image', null);
    }

    this.transitionTo('clues.clue', clue.get('uid'));
  },

  actions: {
    loading() {
      this.controllerFor('clues').set('isLoading', true);
    }
  }
});
