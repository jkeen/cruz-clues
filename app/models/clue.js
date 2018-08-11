import attr from 'ember-data/attr';
import PrismicDocument from 'ember-data-prismic/models/prismic-document';
export default PrismicDocument.extend({
  image: attr(),
  embed: attr(),
  text:  attr()
});
