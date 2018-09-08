import Component from '@ember/component';
import { computed } from '@ember/object';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { htmlSafe } from '@ember/string';

export default Component.extend(ResizeAware, {
  classNames: ['clues-view'],
  classNameBindings: ['clue.mediaType', 'isFluid'],
  resizeWidthSensitive: true,
  resizeHeightSensitive: true,

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

  clueStyle: computed('maxWidth', 'maxHeight', function() {
    return htmlSafe(`width: ${this.get('maxWidth')}px; height: ${this.get('maxHeight')}px;`);
  }),

  maxWidth: computed('maxDimensions', 'maxDimensions.@each', function() {
    return this.get('maxDimensions')[0];
  }),

  maxHeight: computed('maxDimensions', 'maxDimensions.@each', function() {
    return this.get('maxDimensions')[1];
  }),

  ready: computed('maxWidth', 'maxHeight', function() {
    return (this.get('maxWidth') > 0 && this.get('maxHeight') > 0 && window);
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
