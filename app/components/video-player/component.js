import Component from '@ember/component';
import { computed } from '@ember/object';
import { task, waitForProperty, timeout } from 'ember-concurrency';

export default Component.extend({
  classNames: ['video-player'],
  attributeBindings: ['ytid:data-ytid'],
  classNameBindings: ['hasPlayed', 'isMobileDevice', 'isReady'],

  isMobileDevice: computed({
    get() {
      return ('ontouchstart' in window);
    },
    set(k, v) { return v; }
  }),

  init() {
    this._super(...arguments);
    this.initializeVideo();
  },

  forceInitialPlay: task(function * () {
    yield waitForProperty(this, 'ytPlayer', v => !!v);
    this.set('ytPlayer.playerVars', this.get('playerVars'));
    yield waitForProperty(this, 'ytPlayer.playerState', v => v === 'ready');
    this.set('isReady', true)
    yield timeout(200);
    this.get('ytPlayer').send('seekTo', this.get('startSeconds'));
    yield waitForProperty(this, 'ytPlayer.playerState', v => v === 'playing');

    if (!this.get('isMobileDevice')) {
      // mobile restrictions are strict
      yield this.get('tryUnmuting').perform();
    }
    this.get('onPlay')(true);
  }).on('didInsertElement'),

  tryUnmuting: task(function * () {
    yield timeout(500)
    this.get('ytPlayer').send('unMute');
    yield timeout(200);
    if (this.get('ytPlayer.playerState') === 'playing') {
      this.set('playingUnmuted', true);
    }
    else {
      this.get('ytPlayer').send('mute');
      this.get('ytPlayer').send('play');
      this.set('ytPlayer.playerVars', this.get('playerVars'));
    }
  }),

  initializeVideo() {
    let ytid = this.get('embed.embed_url').split('=')[1];

    if (!ytid) {
      ytid = this.get('embed.embed_url').split('/').pop()
    }

    this.set('ytid', ytid);

    this.set('playerVars', {
      autoplay: 1,
      showinfo: 0,
      fs: 0,
      iv_load_policy: 1,
      playsinline: 1,
      modestbranding: 1,
      rel: 0,
      mute: 1
    });
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.initializeVideo();
  },

  actions: {
    triggerPlay() {
      this.get('ytPlayer').send('unMute');
      this.get('ytPlayer').send('play');
      this.set('playingUnmuted', true);
    },
    ytPlaying() {

    },
    ytEnded() {

    },
    ytBuffering() {},
    ytPaused() {}
  }
});
