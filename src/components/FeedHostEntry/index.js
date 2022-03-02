import React from 'react'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'

export default React.memo(function FeedHostEntry(props) {
  return (
    <FeedEntry icon='users' date={props.date}>
      {props.user.name} has organized
      {props.hosts.length > 1 ? (
        <>
          , alongside{' '}
          <MemberList
            members={props.hosts.filter(winner => winner !== props.user.name)}
          />
          ,
        </>
      ) : null}{' '}
      {props.name}.
      {props.description ? <blockquote>{props.description}</blockquote> : null}
    </FeedEntry>
  )
})
