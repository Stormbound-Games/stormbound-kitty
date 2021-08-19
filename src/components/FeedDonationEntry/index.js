import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedDonationEntry(props) {
  return (
    <FeedEntry icon='heart' date={props.date}>
      {props.displayName} has issued a generous{' '}
      <Link to='/about'>donation to Stormbound-Kitty</Link>.
    </FeedEntry>
  )
})
