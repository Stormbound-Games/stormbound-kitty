// Ugh, that’s an absolute pain…
// So, Cypress doesn’t support dynamically declaring `it` blocks — they need to
// be defined statically. This means we need to call the `getSearchIndex()`
// function *before* starting the tests. We can do that as part of the Cypress
// configuration (`plugins` file), except that it doesn’t support import/export
// out of the box. So we need to transpile the configuration via Babel (and add
// module aliases), only to be able to import the `getSearchIndex()` function.
// What. A. Pain.
require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs'],
})
require('module-alias/register')

module.exports = require('./main').default
