import Service, { inject } from '@ember/service';
import { computed } from '@ember/object';
export default Service.extend({
  store: inject(),

  init() {
    this.set('clueIds', []);

    let clues = this.get('store').peekAll('clue').toArray()
    this.set('models', clues);
    this.set('clueIds', this.shuffle(clues.mapBy('id')));

    this._super(...arguments);
  },

  currentId: null,

  nextId: computed('clueIds', 'currentId', function() {
    return this.get('clueIds').filter(i => (i !== this.get('currentId')))[0];
  }),

  followingId: computed('clueIds', function() {
    return this.get('clueIds').filter(i => (i !== this.get('currentId')))[1];
  }),

  markClueSeen(id) {
    this.set('clueIds', this.get('clueIds').filter(i => (id !== i)));

    if (this.get('clueIds').length === 1) {
      // Leave on in there so we can preload the clue after the current one

      let nextId = this.get('clueIds').pop();
      let followingIds = this.shuffle(this.get('models').mapBy('id').filter(i => (nextId !== i)))
      this.set('clueIds', [nextId].concat(followingIds));
    }
  },

  shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
  }
});
