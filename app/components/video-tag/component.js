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

    if (this.get('posterUrl') && this.get('onLoad')) {
      let image = new Image()
      image.onload = function() {
        _this.get('onLoad')(this.naturalWidth, this.naturalHeight)
      }
      image.src = this.get('posterUrl');
    }

    else if (this.get('onLoad')) {
      this.element.oncanplay = function() {
        let dimensions = this.getBoundingClientRect();
        _this.get('onLoad')(dimensions.width, dimensions.height);
      }
    }

    this._super(...arguments);
  }
});
