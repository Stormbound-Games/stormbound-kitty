import rwc from 'random-weighted-choice'
import getFactionWeights from '~/helpers/getFactionWeights'

const getOpponentFaction = modifier => rwc(getFactionWeights(modifier))

export default getOpponentFaction
