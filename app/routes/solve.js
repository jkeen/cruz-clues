import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData  : service(),
  metrics   : service(),

  titleToken: function() {
    return "Solve The Mystery";
  }
});
