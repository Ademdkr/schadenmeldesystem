// frontend/karma.conf.js

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      clearContext: false
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ]
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    restartOnFileChange: false,

    // Nutze genau den Namen 'ChromeHeadless'
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      // Überschreibt den eingebauten Headless-Launcher mit den nötigen Flags
      ChromeHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--headless',               // Headless-Modus
          '--no-sandbox',             // nötig im Container
          '--disable-gpu',            // GPU abschalten
          '--disable-dev-shm-usage',  // shared memory umgehen
          '--disable-extensions',     // Extensions ausschalten
          '--remote-debugging-port=9222'
        ]
      }
    }
  });
};
