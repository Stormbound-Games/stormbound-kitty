import rwc from 'random-weighted-choice'
import getFactionWeights from '~/helpers/getFactionWeights'

const getOpponentFaction = (brawls, modifier) =>
  rwc(getFactionWeights(brawls, modifier))

export default getOpponentFaction
