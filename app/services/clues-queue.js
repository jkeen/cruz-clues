import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';
export default Service.extend({
  store     : service(),
  fastboot  : service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),
  currentId : null,

  init() {
    this.set('clueIds', []);

    let clues = this.get('store').peekAll('clue').toArray()
    this.set('models', clues);
    this.set('clueIds', this.shuffle(clues.mapBy('id')));

    this._super(...arguments);
  },

  load(id) {
    if (this.get('clueIds').includes(id)) {
      this.set('currentId', id);      
    }

    let loading = new Promise((resolve) => {
      return this.get('store').findRecord('clue', id).then(record => {
        if (!this.get('isFastBoot') && ['image', 'gif'].includes(record.get('clueType'))) {
          let image = new window.Image()
          image.onload = function() {
            resolve(record)
          }
          image.src = record.get('image.url')
        }
        else {
          resolve(record);
        }
      })
    });

    return loading;
  },

  nextId: computed('clueIds', 'currentId', function() {
    let totalCount = this.get('clueIds').length;

    let index = this.get('clueIds').indexOf(this.get('currentId'));

    if (index < (totalCount - 1)) {
      return this.get('clueIds')[index + 1];
    }
    else {
      return this.get('clueIds')[0];
    }
  }),

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
