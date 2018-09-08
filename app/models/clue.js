import attr from 'ember-data/attr';
import PrismicDocument from 'ember-data-prismic/models/prismic-document';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';
import { inject as service } from '@ember/service';
import { or } from '@ember/object/computed';

export default PrismicDocument.extend({
  fastboot: service(),
  title: attr(),
  image: attr(),
  imageLink: attr(),
  clueType: attr(),
  embed: attr(),
  text:  attr(),
  naturalWidth: null,
  naturalHeight: null,

  imageUrl: or('image.url', 'imageLink.url', 'embed.url'),

  mediaWidth: computed('naturalWidth', 'image.dimensions{width,height}', 'clueType', 'embed{height,width}', function() {
    if (['embed', 'imageLink'].includes(this.get('clueType'))) {
      return this.get('naturalWidth');
    }
    else if (this.get('mediaType') === 'image') {
      return this.get('image.dimensions.width');
    }
    else {
      return this.get('embed.width');
    }
  }),

  mediaHeight: computed('naturalHeight', 'image.dimensions{width,height}', 'clueType', 'embed{height,width}', function() {
    if (['embed', 'imageLink'].includes(this.get('clueType'))) {
      return this.get('naturalHeight');
    }
    else if (this.get('mediaType') === 'image') {
      return this.get('image.dimensions.height');
    }
    else {
      return this.get('embed.height');
    }
  }),

  mediaType: computed('clueType', function() {
    let imageTypes = makeArray(['gif', 'image', 'imageLink']);
    if (imageTypes.includes(this.get('clueType'))) {
      return 'image';
    }
    else if (this.get('clueType') === 'video') {
      return 'video';
    }
    else {
      return this.get('clueType');
    }
  }),

  mediaAspectRatio: computed('mediaHeight', 'mediaWidth', function() {
    return this._precisionRound((this.get('mediaWidth') / this.get('mediaHeight')), 5);
  }),

  _precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
});
