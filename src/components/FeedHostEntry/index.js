import React from 'react'
import FeedEntry from '../FeedEntry'
import MemberList from '../MemberList'

export default React.memo(function FeedHostEntry(props) {
  const name = props.hosts.find(u => u.toLowerCase() === props.user)

  return (
    <FeedEntry icon='users' date={props.date}>
      {name} has organised
      {props.hosts.length > 1 ? (
        <>
          , alongside{' '}
          <MemberList members={props.hosts.filter(winner => winner !== name)} />
          ,
        </>
      ) : null}{' '}
      {props.name}.
      {props.description ? <blockquote>{props.description}</blockquote> : null}
    </FeedEntry>
  )
})
