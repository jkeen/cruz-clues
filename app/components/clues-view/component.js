import Component from '@ember/component';
import { computed } from '@ember/object';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { htmlSafe } from '@ember/string';
import { alias } from '@ember/object/computed';
import URL from 'url';

export default Component.extend(ResizeAware, {
  classNames: ['clues-view', 'flex-body'],
  classNameBindings: ['clue.mediaType', 'isFluid'],
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,

  isYoutubeVideo: computed('clue.mediaType', function() {
    return this.get('clue.mediaType') === 'video';
  }),

  isProvidedImage: computed('clue.mediaType', function() {
    return this.get('clue.mediaType') === 'image';
  }),

  isLinkedImage: computed('clue{mediaType,imageUrl}', function() {
    let pathName = new URL(this.get('clue.imageUrl')).pathname;

    return this.get('clue.mediaType') === 'imageLink' && ['jpg', 'png', 'gif'].includes(pathName.split('.').pop())
  }),

  isLinkedVideoGif: computed('clue{mediaType,imageUrl}', function() {
    let pathName = new URL(this.get('clue.imageUrl')).pathname;
    return this.get('clue.mediaType') === 'imageLink' && ['gifv', 'mp4'].includes(pathName.split('.').pop())
  }),

  clueText: alias('clue.text'),

  clueStyle: computed('maxWidth', 'maxHeight', function() {

    let maxWidth = this.get('maxWidth');
    let maxHeight = this.get('maxHeight');

    if (maxHeight > 0 && maxWidth > 0) {
      return htmlSafe(`width: ${maxWidth}px; height: ${maxHeight}px;`);
    }
    else {
      return htmlSafe('');
    }
  }),

  isReady: computed('maxWidth', 'maxHeight', function() {
    return (this.get('maxWidth') > 0 && this.get('maxHeight') > 0 && window);
  }),

  maxDimensions: computed('clue.mediaAspectRatio', 'availableWidth', 'availableHeight', function() {
    let desiredAspectRatio = this.get('clue.mediaAspectRatio');
    let containerWidth     = this.get('availableWidth');
    let containerHeight    = this.get('availableHeight');

    if (!(desiredAspectRatio && containerWidth && containerHeight)) {
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

  maxWidth: computed('maxDimensions', 'maxDimensions.@each', function() {
    return this.get('maxDimensions')[0];
  }),

  maxHeight: computed('maxDimensions', 'maxDimensions.@each', function() {
    return this.get('maxDimensions')[1];
  }),

  didResize(width, height) {
    let multiplier = 1;
    if (window && window.matchMedia && window.matchMedia("(orientation: landscape)").matches) {
      multiplier = 0.9;
    }

    this.set('availableWidth', window.innerWidth * multiplier);
    this.set('availableHeight', height * 0.8);
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

  actions: {
    reportNaturalDimensions(width, height) {
      this.get('clue').set('naturalWidth', width);
      this.get('clue').set('naturalHeight', height);
    }
  }

});
