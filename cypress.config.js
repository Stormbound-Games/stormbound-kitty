const path = require('path')
const preprocessor = require('@cypress/webpack-preprocessor')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  coverage: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 90000,
  env: {
    coverage: false,
  },
  numTestsKeptInMemory: 10,
  projectId: 'h321g2',
  retries: {
    runMode: 3,
    openMode: 0,
  },
  video: false,
  viewportHeight: 768,
  viewportWidth: 1200,
  e2e: {
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        preprocessor({
          webpackOptions: {
            resolve: {
              alias: {
                '#api': path.resolve('./src/api'),
                '#components': path.resolve('./src/components'),
                '#constants': path.resolve('./src/constants'),
                '#helpers': path.resolve('./src/helpers'),
                '#hooks': path.resolve('./src/hooks'),
              },
            },
          },
        })
      )

      return config
    },
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['selectors.js'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
