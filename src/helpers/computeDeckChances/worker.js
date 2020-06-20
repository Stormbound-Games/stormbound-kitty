import { expose } from 'comlink'
import computeDeckChances from './'

// The `process.title` key holds `browser` or `node` depending on whether the
// worker was spawned from the browser or from a Node process. We can use that
// to tweak the integration of Comlink depending on the environment we’re in.
if (process.title === 'node') {
  // Webpack will try to bundle `worker_threads` and fail. This is usually fixed
  // by using `IgnorePlugin` but this cannot be done without ejecting CRA, which
  // is not what we want. By using `eval`, we can circumvent the Webpack bundle
  // error and use `require` when running from Node.
  // eslint-disable-next-line no-eval
  const { parentPort } = eval('require')('worker_threads')
  const nodeEndpoint = require('comlink/dist/umd/node-adapter.js')
  expose(computeDeckChances, nodeEndpoint(parentPort))
} else {
  expose(computeDeckChances)
}
