import attr from 'ember-data/attr';
import PrismicDocument from 'ember-data-prismic/models/prismic-document';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';

export default PrismicDocument.extend({
  title: attr(),
  image: attr(),
  clueType: attr(),
  embed: attr(),
  text:  attr(),

  mediaWidth: computed('image.dimensions{width,height}', 'clueType', 'embed{height,width}', function() {
    if (this.get('mediaType') === 'image') {
      return this.get('image.dimensions.width');
    }
    else {
      return this.get('embed.width');
    }
  }),

  mediaHeight: computed('image.dimensions{width,height}', 'clueType', 'embed{height,width}', function() {
    if (this.get('mediaType') === 'image') {
      return this.get('image.dimensions.height');
    }
    else {
      return this.get('embed.height');
    }
  }),

  mediaType: computed('clueType', function() {
    let imageTypes = makeArray(['gif', 'image']);
    if (imageTypes.includes(this.get('clueType'))) {
      return 'image';
    }
    else if (this.get('clueType') === 'video') {
      return 'video';
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
