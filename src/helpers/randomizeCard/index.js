import { FACTIONS, RACES, TYPES, RARITIES } from '~/constants/game'
import arrayRandom from '~/helpers/arrayRandom'

const randomizeCard = () => {
  return {
    type: arrayRandom(TYPES),
    race: arrayRandom(RACES),
    rarity: arrayRandom(RARITIES),
    faction: arrayRandom(FACTIONS),
  }
}

export default randomizeCard
