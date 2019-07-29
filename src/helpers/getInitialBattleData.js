import { deserialiseBattle } from './deserialise'
import {
  DEFAULT_PLAYER,
  DEFAULT_BOARD,
  DEFAULT_MANA
} from '../constants/battle'
import { DEFAULT_DECK } from '../constants/deck'

export default sim => {
  if (!sim) {
    return {
      board: DEFAULT_BOARD,
      mana: DEFAULT_MANA,
      cards: [...DEFAULT_DECK],
      hand: [],
      players: {
        RED: { ...DEFAULT_PLAYER },
        BLUE: { ...DEFAULT_PLAYER }
      }
    }
  }

  const decodedData = decodeURIComponent(sim)

  return { ...deserialiseBattle(decodedData) }
}
