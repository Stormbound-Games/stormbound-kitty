import serialization from '~/helpers/serialization'
import { DEFAULT_SIM } from '~/constants/battle'

const getInitialBattleData = (cardsIndex, sim) =>
  sim
    ? serialization.battle.deserialize(cardsIndex, decodeURIComponent(sim))
    : DEFAULT_SIM

export default getInitialBattleData
