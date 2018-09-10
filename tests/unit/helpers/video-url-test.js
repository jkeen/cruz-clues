import { videoUrl } from 'cruzclues/helpers/video-url';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | video-url', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    let result = videoUrl(["http://imgur.com/D2ddsg.gifv"]);
    assert.equal(result, "http://imgur.com/D2ddsg.mp4");
  });
});
