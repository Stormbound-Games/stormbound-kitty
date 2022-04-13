import React from 'react'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedYouTubeEntry(props) {
  return (
    <FeedEntry icon='sword' date='Player ID'>
      {props.user.name}’s Stormbound player ID is{' '}
      <span className='Highlight'>{props.playerId}</span>. Consider adding them
      to your friend list in the game so you can play together.
    </FeedEntry>
  )
})
