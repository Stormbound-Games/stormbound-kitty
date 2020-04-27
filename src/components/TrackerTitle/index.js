import React from 'react'
import Title from '../Title'
import { STATUSES } from '../../constants/tracker'

const getTitle = status => {
  switch (status) {
    case STATUSES.PICKING_HAND:
      return 'Define your starting hand'
    case STATUSES.REFILLING:
      return 'Refill your hand'
    case STATUSES.PLAYING_FREEBOOTERS:
      return 'Finish playing Freebooters'
    case STATUSES.PLAYING_SNAKE_EYES:
      return 'Finish playing Snake Eyes'
    case STATUSES.PLAYING_GOLDGRUBBERS_DRAWING:
    case STATUSES.PLAYING_GOLDGRUBBERS_REMOVING:
      return 'Finish playing Goldgrubbers'
    case STATUSES.PLAYING_QUEEN_OF_HERDS:
      return 'Finish playing Queen of Herds'
    case STATUSES.PLAYING_ARCHDRUID_EARYN:
      return 'Finish playing Archdruid Earyn'
    case STATUSES.CYCLING:
      return 'Finish cycling'
    case STATUSES.PLAYING:
      return 'Play your turn'
    default:
      return 'Unknown state'
  }
}

const TrackerTitle = React.memo(function TrackerTitle(props) {
  return <Title>{getTitle(props.status)}</Title>
})

export default TrackerTitle
