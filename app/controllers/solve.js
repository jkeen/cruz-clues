import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  metrics: service(),
  actions: {
    trackDonateClick() {
      get(this, 'metrics').trackEvent('Piwik', {
         category: 'ui-interaction',
         action: 'clicked-donate-to-beto',
         value: window.document.location.href
      });
    },
    trackRegisterClick() {
      get(this, 'metrics').trackEvent('Piwik', {
         category: 'ui-interaction',
         action: 'clicked-register-to-vote',
         value: window.document.location.href
      });
    }
  }

});
