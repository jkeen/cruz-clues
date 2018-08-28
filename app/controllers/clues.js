import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  resize: service(),
  init() {
    this.get('resize').on('didResize', () => {
       this.updateFluidFlag();
    });
    this.updateFluidFlag();
    this._super(...arguments);
  },

  updateFluidFlag() {
    this.set('isFluid', window.innerHeight < 600);
  },

  actions: {
    trackComplaintClick() {
      get(this, 'metrics').trackEvent('complaint', {});
    },
    trackTipClick() {
      get(this, 'metrics').trackEvent('tip', {});
    }
  }
});
