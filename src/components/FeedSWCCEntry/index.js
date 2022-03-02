import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'

export default React.memo(function FeedSWCCEntry(props) {
  const verb = props.users.length === 1 ? 'has' : 'have'

  return (
    <FeedEntry icon='hammer' date={props.date}>
      <MemberList members={props.users} /> {verb} started a new season of the{' '}
      <Link to='/card/contest'>Stormbound Weekly Card Contest</Link> (SWCC for
      short).
    </FeedEntry>
  )
})
