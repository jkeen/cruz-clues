import Component from '@ember/component';

export default Component.extend({
  tagName: 'video',
  attributeBindings:['preload', 'autoplay', 'muted', 'loop', 'playsInline:webkit-playsinline', 'playsInline'],
  preload: 'auto',
  autoplay: 'autoplay',
  muted: 'muted',
  loop: true,
  playsInline: 'true',
  classNames: ['clues-view-video-tag'],

  init() {
    this._super(...arguments);
    this._src = this.src;
    this.updated = false;
  },

  onChange() {
    let _this = this;
    if (this.get('onLoad')) {
      this.element.onloadedmetadata = function() {
        _this.get('onLoad')(this.videoWidth, this.videoHeight);
      }
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.onChange();
  },

  didUpdateAttrs()  {
    if (this._src !== this.src) {
      this.element.load();
      this._src = this.src;
      this.onChange();
    }
    this._super(...arguments);
  },

  willDestroyElement() {
    this.element.onloadedmetadata = function() {};
    this._super(...arguments);
  },

});
