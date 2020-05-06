import rwc from 'random-weighted-choice'
import getFactionWeights from '../getFactionWeights'

export default modifier => rwc(getFactionWeights(modifier))
