import Component from '@ember/component';
import { computed } from '@ember/object';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Component.extend(ResizeAware, {
  classNames: ['clues-view'],

  resizeWidthSensitive: true,
  resizeHeightSensitive: true,

  init() {
    this._super(...arguments);
    this.set('maxWidth', 1);
    this.set('maxHeight', 1);
  },

  didResize(width, height) {
    this.set('maxWidth', width * 0.8);
    this.set('maxHeight',height * 0.8);
  },

  mediaType: computed('clue{image,embed}', function() {
    return this.get('clue.embed.html') ? 'video' : 'image';
  }),

  aspectRatio: computed('clue.image.dimensions{width,height}', 'mediaType', 'embed{height,width}', function() {
    if (this.get('mediaType') === 'image') {
      return this.precisionRound((this.get('clue.image.dimensions.width') / this.get('clue.image.dimensions.height')), 5);
    }
    else {
      return  this.precisionRound((this.get('embed.width') / this.get('embed.height')), 5);
    }
  }),

  biggestDimensions: computed('aspectRatio', 'maxWidth', 'maxHeight', function() {
    let desiredAspectRatio = this.get('aspectRatio');
    let containerWidth = this.get('maxWidth');
    let containerHeight = this.get('maxHeight');

    var maximizedToHeight = [containerWidth, Math.ceil(containerWidth / desiredAspectRatio)];
    var maximizedToWidth  = [Math.ceil(containerHeight * desiredAspectRatio), containerHeight];

    if (maximizedToWidth[0] <= containerWidth) {
      return maximizedToWidth;
    }
    else if (maximizedToHeight[1] <= containerHeight) {
      return maximizedToHeight;
    }
  }),

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  },

  imageWidth: computed('biggestDimensions', function() {
    return this.get('biggestDimensions')[0];
  }),
  imageHeight: computed('biggestDimensions', function() {
    return this.get('biggestDimensions')[1];
  }),

  didInsertElement() {
    let dimensions = this.element.getBoundingClientRect();
    this.didResize(dimensions.width, dimensions.height);

    this._super(...arguments);
  },

});
