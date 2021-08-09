import React from 'react'
import Notice from '../Notice'
import { STATUSES } from '../../constants/tracker'

const getHint = ({ status, playerOrder }) => {
  switch (status) {
    case STATUSES.PICKING_HAND:
      return (
        <>
          Select the 4 cards that constitute your initial hand.
          {playerOrder === 'FIRST' &&
            'If you are the second player, check the “Second player” checkbox above.'}
        </>
      )
    case STATUSES.REFILLING:
      return 'You just ended your turn: select which card you drew.'
    case STATUSES.PLAYING_FREEBOOTERS:
      return 'You just played Freebooters: select which card(s) you drew.'
    case STATUSES.PLAYING_SNAKE_EYES:
      return 'You just played Snake Eyes: select the new cards you drew.'
    case STATUSES.PLAYING_FIRST_MUTINEER:
      return 'You just played First Mutineer: select which card got removed.'
    case STATUSES.PLAYING_GOLDGRUBBERS_REMOVING:
      return 'You just played Goldgrubbers with more than a single non-pirate in hand: select which card got removed.'
    case STATUSES.PLAYING_GOLDGRUBBERS_DRAWING:
      return 'You just played Goldgrubbers: select which card you drew.'
    case STATUSES.PLAYING_QUEEN_OF_HERDS:
      return 'You just played Queen of Herds with several satyrs in the deck: select which card(s) got played.'
    case STATUSES.PLAYING_ARCHDRUID_EARYN:
      return 'You just played Archdruid Earyn with several spells in your hand: select which card(s) got played.'
    case STATUSES.CYCLING:
      return 'You just cycled a card: select which card you drew.'
    case STATUSES.PLAYING:
      return 'Play your turn, then press “End turn”.'
    default:
      return 'The tracker appears to be in an unknown state. Please report.'
  }
}

export default React.memo(function TrackerHint(props) {
  return (
    <div className='TrackerHint'>
      <Notice>{getHint(props)}</Notice>
    </div>
  )
})
