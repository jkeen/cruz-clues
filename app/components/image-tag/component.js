import Component from '@ember/component';

export default Component.extend({
  tagName: 'img',
  attributeBindings:['src', 'width', 'height'],
  didInsertElement() {
    let _this = this;
    this.element.onload = function() {
      if (_this.get('onLoad')) {
        _this.get('onLoad')(this.naturalWidth, this.naturalHeight);
      }
    }
    this.set('src', this.get('src'));
    this._super(...arguments);
  }
});
