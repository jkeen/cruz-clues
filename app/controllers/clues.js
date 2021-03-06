import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  metrics: service(),
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
      get(this, 'metrics').trackEvent('Piwik', {
         category: 'ui-interaction',
         action: 'clicked-complaint-link',
         value: window.document.location.href
      });
    },
    trackTipClick() {
      get(this, 'metrics').trackEvent('Piwik', {
         category: 'ui-interaction',
         action: 'clicked-submit-a-clue-link',
         value: window.document.location.href
      });
    }
  }
});
