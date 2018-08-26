import Component from '@ember/component';
import { computed } from '@ember/object';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { Promise } from 'rsvp';
import { task, waitForProperty, timeout } from 'ember-concurrency';
import { makeArray } from '@ember/array';

export default Component.extend(ResizeAware, {
  classNames: ['clues-view'],
  classNameBindings: ['mediaType', 'isFluid'],
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,

  init() {
    this._super(...arguments);
    this.loadContent.perform();
  },

  mediaType: computed('clue.clueType', function() {
    let imageTypes = makeArray(['gif', 'image']);
    if (imageTypes.includes(this.get('clue.clueType'))) {
      return 'image';
    }
    else if (this.get('clue.clueType') === 'video') {
      return 'video';
    }
  }),

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  },

  aspectRatio: computed('clue.image.dimensions{width,height}', 'clue.clueType', 'embed{height,width}', function() {
    if (this.get('mediaType') === 'image') {
      return this.precisionRound((this.get('clue.image.dimensions.width') / this.get('clue.image.dimensions.height')), 5);
    }
    else {
      return this.precisionRound((this.get('clue.embed.width') / this.get('clue.embed.height')), 5);
    }
  }),

  biggestDimensions: computed('aspectRatio', 'maxWidth', 'maxHeight', function() {
    let desiredAspectRatio = this.get('aspectRatio');
    let containerWidth = this.get('maxWidth');
    let containerHeight = this.get('maxHeight');

    if (!(containerWidth && containerHeight && desiredAspectRatio)) {
      return [0, 0];
    }

    var maximizedToHeight = [containerWidth, Math.ceil(containerWidth / desiredAspectRatio)];
    var maximizedToWidth  = [Math.ceil(containerHeight * desiredAspectRatio), containerHeight];

    if (maximizedToWidth[0] <= containerWidth) {
      return maximizedToWidth;
    }
    else if (maximizedToHeight[1] <= containerHeight) {
      return maximizedToHeight;
    }
  }),

  mediaWidth: computed('biggestDimensions', 'biggestDimensions.@each', function() {
    return this.get('biggestDimensions')[0];
  }),
  mediaHeight: computed('biggestDimensions', 'biggestDimensions.@each', function() {
    return this.get('biggestDimensions')[1];
  }),

  loadContent: task(function * () {
    if (this.get('mediaType') === 'image') {
      yield new Promise((resolve) => {
        let image = new Image();
        image.src = this.get('clue.image.url');
        image.onload = function() {
          resolve();
        }
      })

    }
  }),

  didResize(width, height) {
    this.set('maxWidth', window.innerWidth);
    this.set('maxHeight', height * 0.8);
  },

  didInsertElement() {
    let dimensions = this.element.getBoundingClientRect();
    this.didResize(window.innerWidth, dimensions.height);

    this._super(...arguments);
  },

  didUpdateAttrs() {
    let dimensions = this.element.getBoundingClientRect();
    this.didResize(window.innerWidth, dimensions.height);

    this._super(...arguments);
  },

});
