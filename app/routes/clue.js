import Route from '@ember/routing/route';
export default Route.extend({
  model(params) {
    return this.store.loadRecord('clue', params.id);
  },
  // afterModel(model) {
  //   this._super(...arguments);
  // },

});
