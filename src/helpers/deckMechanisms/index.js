import draw from './draw'
import endTurn from './endTurn'
import play, { DEFAULT_PLAY_OPTIONS } from './play'
import cycle, { DEFAULT_CYCLE_OPTIONS } from './cycle'

const deckMechanisms = {
  DEFAULT_PLAY_OPTIONS,
  DEFAULT_CYCLE_OPTIONS,
  cycle,
  draw,
  endTurn,
  play,
}

export default deckMechanisms
