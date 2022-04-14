// Ugh, that’s an absolute pain…
// To avoid querying the API every time we need the data for a card, we need to
// call the `getCards()` function *before* starting the tests. We can do that as
// part of the Cypress configuration (`plugins` file), except that it doesn’t
// support import/export out of the box. So we need to transpile the
// configuration via Babel (and add module aliases), only to be able to import
// the `getCards()` function. What. A. Pain.
require('@babel/register')({
  plugins: ['@babel/plugin-transform-modules-commonjs'],
})
require('module-alias/register')

module.exports = require('./main').default
