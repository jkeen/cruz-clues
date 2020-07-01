import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = document.location.href;
      const title = getWithDefault(this, 'routeName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  },

  title(tokens = []) {
    let siteName = 'Cruz Clues';
    tokens.unshift(siteName);

    let title =  tokens.filter(s => s.length > 0).join(' | ');
    return title;
  },

  model() {
    return this.store.loadAll('clue');
  }
});
