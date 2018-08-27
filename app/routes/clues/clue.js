import Route from '@ember/routing/route';
import {inject } from '@ember/service';
import RSVP from 'rsvp';
export default Route.extend({
  cluesQueue: inject(),
  headData: inject(),

  titleToken: function(model) {
    return model.currentClue.get('title');
  },

  model(params) {
    let currentId = params.id
    let queue = this.get('cluesQueue');
    queue.set('currentId', currentId);

    return RSVP.hash({
      currentClue: queue.load(currentId)
    })
  },

  afterModel(model) {
    this.set('headData.title', model.currentClue.get('title'));
    let clueImage = model.currentClue.get('image.url') || model.currentClue.get('embed.thumbnail_url');
    if (clueImage) {
      this.set('headData.image', clueImage);
    }
    else {
      this.set('headData.image', null);
    }
  }
});
