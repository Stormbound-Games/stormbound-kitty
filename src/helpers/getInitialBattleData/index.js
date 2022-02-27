import serialization from '~/helpers/serialization'
import { DEFAULT_PLAYER, DEFAULT_BOARD, DEFAULT_MANA } from '~/constants/battle'
import { DEFAULT_DECK } from '~/constants/deck'

const getInitialBattleData = (cardsIndex, sim) => {
  if (!sim) {
    return {
      board: DEFAULT_BOARD,
      mana: DEFAULT_MANA,
      cards: [...DEFAULT_DECK],
      hand: [],
      players: {
        RED: { ...DEFAULT_PLAYER },
        BLUE: { ...DEFAULT_PLAYER },
      },
    }
  }

  const decodedData = decodeURIComponent(sim)

  return { ...serialization.battle.deserialize(cardsIndex, decodedData) }
}

export default getInitialBattleData
