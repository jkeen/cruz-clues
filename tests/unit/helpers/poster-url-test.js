import { posterUrl } from 'cruzclues/helpers/poster-url';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | poster-url', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = posterUrl([42]);
    assert.ok(result);
  });
});
