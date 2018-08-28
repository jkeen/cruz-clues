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
      currentClue: queue.load(currentId)
    })
  },

  afterModel(model) {
    let clue = model.currentClue;
    this.set('headData.title', clue.get('title'));
    let clueImage = (get(clue, 'image.url') || get(clue, 'embed.thumbnail_url'));
    if (clueImage) {
      this.set('headData.image', clueImage);
    }
    else {
      this.set('headData.image', null);
    }
  }
});
