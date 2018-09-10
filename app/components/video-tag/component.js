import Component from '@ember/component';

export default Component.extend({
  tagName: 'video',
  attributeBindings:['preload', 'autoplay', 'muted', 'loop', 'webkit-playsinline', 'clueStyle:style', 'posterUrl:poster'],
  preload: 'auto',
  autoplay: 'autoplay',
  muted: 'muted',
  loop: 'loop',

  didInsertElement() {
    let _this = this;
    let image = new Image()
    image.onload = function() {
      _this.get('onLoad')(this.naturalWidth, this.naturalHeight)
    }
    image.src = this.get('posterUrl');

    this._super(...arguments);
  }
});
