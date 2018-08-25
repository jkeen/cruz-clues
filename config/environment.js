'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'cruzclues',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    fastboot: {
      hostWhitelist: ['cruzclues.com', 'staging.cruzclues.com', 'cruz-clues.herokuapp.com', /^localhost:\d+$/]
    },

    googleFonts: [
     'Ledger'
    ],

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    prismic: {
      apiEndpoint: process.env.PRISMIC_API_ENDPOINT,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      ref: process.env.PRISMIC_REF,
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
