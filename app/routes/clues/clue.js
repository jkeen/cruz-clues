import Route from '@ember/routing/route';
import {inject } from '@ember/service';
import RSVP from 'rsvp';
export default Route.extend({
  cluesQueue: inject(),

  titleToken: function(model) {
    return [model.currentClue.get('title')];
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
    var headTags = [
      {
        type: "meta",
        tagId: "facebook-og-title",
        attrs: {
          property: "og:title",
          content: `Cruz Clues | ${model.currentClue.get('title')}`
        }
      },
      {
        type: "meta",
        tagId: "facebook-og-image",
        attrs: {
          property: "og:image",
          content: 'http://cruzclues.com/assets/flag.png'
        }
      }
    ];

    this.set("headTags", headTags);
  }
});
