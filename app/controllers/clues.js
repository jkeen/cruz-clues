import Controller from '@ember/controller';
import { inject } from '@ember/service';
export default Controller.extend({
  resize: inject(),
  init() {
    this.get('resize').on('didResize', () => {
       this.updateFluidFlag();
    });
    this.updateFluidFlag();
    this._super(...arguments);
  },

  updateFluidFlag() {
    this.set('isFluid', window.innerHeight < 600);
  }

});
