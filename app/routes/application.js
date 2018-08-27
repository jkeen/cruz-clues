import Route from '@ember/routing/route';
export default Route.extend({
  title(tokens = []) {
    let siteName = 'Cruz Clues';
    tokens.unshift(siteName);
    let title =  tokens.join(' | ');
    return title;
  },

  model() {
    return this.store.loadAll('clue');
  }
});
