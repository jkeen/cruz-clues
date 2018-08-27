import attr from 'ember-data/attr';
import PrismicDocument from 'ember-data-prismic/models/prismic-document';
export default PrismicDocument.extend({
  title: attr(),
  image: attr(),
  clueType: attr(),
  embed: attr(),
  text:  attr()
});
