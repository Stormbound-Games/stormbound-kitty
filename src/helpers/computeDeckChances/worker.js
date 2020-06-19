import { expose } from 'comlink'
import computeDeckChances from './'

// Export the helper as an asynchronous function that can be executed off the
// main thread in a dedicated service worker.
expose(computeDeckChances)
