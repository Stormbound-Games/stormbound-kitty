import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import { DONATORS } from '../../constants/misc'

export default React.memo(function FeedDonationEntry(props) {
  const { author: name } = DONATORS.find(
    entry => entry.author.toLowerCase() === props.user
  )
  return (
    <FeedEntry icon='heart' date={props.date}>
      {name} has issued a generous{' '}
      <Link to='/donate'>donation to Stormbound-Kitty</Link>.
    </FeedEntry>
  )
})
