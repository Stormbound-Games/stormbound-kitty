/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./worker'
import { wrap } from 'comlink'

// Export the helper as an asynchronous function that can be executed off the
// main thread in a dedicated service worker.
export default wrap(new Worker())
