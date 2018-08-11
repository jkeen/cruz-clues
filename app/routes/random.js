import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.loadAll('clue');
  },

  afterModel(model) {
    let clues  = model.toArray();
    let random = clues[Math.floor(Math.random() * (clues.length))];
    this.transitionTo('clue', random.get('id'));
    this._super(...arguments);
  }
});
