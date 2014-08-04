/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: '/api/v1/oauth/token'
    };
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:oauth2-bearer'
    };
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {

  }

  if (environment === 'production') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: '/api/v1/oauth/token'
    };
    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:oauth2-bearer'
    };
  }

  return ENV;
};
