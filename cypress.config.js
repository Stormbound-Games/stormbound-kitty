const path = require('path')
const preprocessor = require('@cypress/webpack-preprocessor')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Enable Cypress Cloud.
  projectId: 'h321g2',

  // Pass the `SANITY_STUDIO_PREVIEW_TOKEN` environment variable (if defined),
  // so Cypress enable the preview mode before visit pages.
  env: {
    SANITY_STUDIO_PREVIEW_TOKEN: process.env.SANITY_STUDIO_PREVIEW_TOKEN,
  },

  // Reduce the memory consumption by lowering the amount of tests kept in
  // memory throughout a run.
  numTestsKeptInMemory: 10,

  // Automatically retry tests up to 3 times when run from the command line.
  retries: { runMode: 3, openMode: 0 },

  // Disable video recording for successful runs.
  videoUploadOnPasses: false,

  // Increase the default viewport size to small laptop screens.
  viewportHeight: 768,
  viewportWidth: 1200,

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      const webpackOptions = {
        resolve: {
          alias: {
            '#api': path.resolve('./src/api'),
            '#components': path.resolve('./src/components'),
            '#constants': path.resolve('./src/constants'),
            '#helpers': path.resolve('./src/helpers'),
            '#hooks': path.resolve('./src/hooks'),
          },
        },
      }

      // Enable Cypress to support path aliases
      on('file:preprocessor', preprocessor({ webpackOptions }))

      return config
    },
  },
})
