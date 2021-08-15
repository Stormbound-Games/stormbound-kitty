import React from 'react'
import Link from '../Link'
import FeedEntry from '../FeedEntry'
import DONATIONS from '../../data/donations'

export default React.memo(function FeedDonationEntry(props) {
  const { author: name } = DONATIONS.find(
    entry => entry.author.toLowerCase() === props.user
  )
  return (
    <FeedEntry icon='heart' date={props.date}>
      {name} has issued a generous{' '}
      <Link to='/about'>donation to Stormbound-Kitty</Link>.
    </FeedEntry>
  )
})
