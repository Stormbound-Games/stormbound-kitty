import React from 'react'
import './index.css'

const TrackerInfo = React.memo(props => (
  <>
    <p>
      This tracker can be used alongside an actual game on another device to get
      real-time drawing chances estimation once every card has been
      played/cycled at least once.
    </p>
    <ol className='TrackerInfo__list'>
      <li>Define your starting hand when the game begins.</li>
      <li>Play cards and/or cycle and refill your hand every turn.</li>
      <li>Check the drawing chances in the deck.</li>
    </ol>
    <p>
      Due to the lack of opponent’s deck, Harvester of Souls’ ability has not
      been implemented and might yield falsy results.
    </p>
  </>
))

export default TrackerInfo
