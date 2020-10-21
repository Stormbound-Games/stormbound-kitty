import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import donations from '../../data/donations'

export default React.memo(function FeedDonationEntry(props) {
  const { author: name } = donations.find(
    entry => entry.author.toLowerCase() === props.user
  )
  return (
    <FeedEntry icon='heart' date={props.date}>
      {name} has issued a generous{' '}
      <Link to='/about'>donation to Stormbound-Kitty</Link>.
    </FeedEntry>
  )
})
