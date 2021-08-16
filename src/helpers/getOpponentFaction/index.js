import rwc from 'random-weighted-choice'
import getFactionWeights from '~/helpers/getFactionWeights'

export default modifier => rwc(getFactionWeights(modifier))
