import Route from '@ember/routing/route';
import Prismic from 'prismic-javascript';
import { inject as service } from '@ember/service';

export default Route.extend({
  cookies: service(),
  model(params) {
    let cookieService = this.get('cookies');
    cookieService.write(Prismic.previewCookie, params.token, { maxAge: 60 * 30, path: '/', httpOnly: false });
    return this.transitionTo('clues.clue', params.documentId);
  }
});
