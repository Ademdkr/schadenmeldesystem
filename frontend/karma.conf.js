module.exports = function (config) {
  config.set({
    // … andere Einstellungen …

    // Nutze unseren eigenen Headless-Launcher
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--remote-debugging-port=9222'
        ]
      }
    },

    // Browser auf GitHub Actions
    browsers: ['ChromeHeadlessCI'],

    // Einmal durchlaufen, dann beenden
    singleRun: true,

    // … weitere Einstellungen …
  });
};
