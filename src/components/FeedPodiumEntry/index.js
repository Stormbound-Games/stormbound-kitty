import React from 'react'
import FeedEntry from '../FeedEntry'
import MemberList from '../MemberList'

export default React.memo(function FeedPodiumEntry(props) {
  const isAtIndex = index =>
    props.podium[index]
      ? Array.isArray(props.podium[index])
        ? props.podium[index].map(u => u.toLowerCase()).includes(props.user)
        : props.podium[index].toLowerCase() === props.user
      : false
  const index = [0, 1, 2].map(isAtIndex).indexOf(true)
  const name = Array.isArray(props.podium[index])
    ? props.podium[index].find(u => u.toLowerCase() === props.user)
    : props.podium[index]
  const emoji = ['🥇', '🥈', '🥉'][index]
  const label = ['gold', 'silver', 'bronze'][index]

  return (
    <FeedEntry icon='trophy' date={props.date}>
      {name} has won
      {Array.isArray(props.podium[index]) ? (
        <>
          , alongside{' '}
          <MemberList
            members={props.podium[index].filter(winner => winner !== name)}
          />
          ,
        </>
      ) : null}{' '}
      the{' '}
      <span className='Highlight'>
        {emoji} {label} medal
      </span>{' '}
      in {props.name}.
    </FeedEntry>
  )
})
