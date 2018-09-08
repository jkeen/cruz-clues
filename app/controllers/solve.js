import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
  actions: {
    trackDonateClick() {
      get(this, 'metrics').trackEvent('GoogleAnalytics', {
         category: 'ui-interaction',
         action: 'clicked-donate-to-beto',
         value: window.document.location.href
      });
    },
    trackRegisterClick() {
      get(this, 'metrics').trackEvent('GoogleAnalytics', {
         category: 'ui-interaction',
         action: 'clicked-register-to-vote',
         value: window.document.location.href
      });
    }
  }

});
