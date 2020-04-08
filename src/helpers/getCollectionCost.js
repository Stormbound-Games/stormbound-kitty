import { RARITY_COPIES } from '../constants/game'
import resolveCardForLevel from './resolveCardForLevel'

const sum = (a, b) => a + b

export default collection => {
  return collection
    .map(card => {
      const { rarity } = resolveCardForLevel(card)
      const { copies, stonesForMissing } = RARITY_COPIES[rarity]

      return [
        stonesForMissing,
        card.level === 2 && copies[0] * stonesForMissing,
        card.level === 3 && copies[1] * stonesForMissing,
        card.level === 4 && copies[2] * stonesForMissing,
        card.level === 5 && copies[3] * stonesForMissing,
        card.copies * stonesForMissing
      ]
        .filter(Boolean)
        .reduce(sum, 0)
    })
    .reduce(sum, 0)
}
