/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'kingmesaj',
        I18N_COMPILE_WITHOUT_HANDLEBARS: true,
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
        ENV.APP.LOG_ACTIVE_GENERATION = true;
        ENV.APP.LOG_VIEW_LOOKUPS = true;
        ENV.contentSecurityPolicy = {
            'script-src': "'self' 'unsafe-eval' http://*:35729",
            'font-src': "'self' http://fonts.gstatic.com",
            'connect-src': "'self' *",
            'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
            'report-uri': "http://www.google.com",
            'img-src': "*"
        };
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'auto';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        // ENV.contentSecurityPolicy = {
        //     'script-src': "'self' 'unsafe-eval' http://*:35729",
        //     'font-src': "'self' http://fonts.gstatic.com",
        //     'connect-src': "'self' *",
        //     'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
        //     'report-uri': "http://www.google.com",
        //     'img-src': "*"
        // };
    }

    return ENV;
};
