import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import contributions from '../../data/contributions'

export default React.memo(function FeedContributionEntry(props) {
  const { author: name } = contributions.find(
    entry => entry.author.toLowerCase() === props.user
  )
  return (
    <FeedEntry icon='hammer' date={props.date}>
      {name} has kindly contributed to the code of the site (
      <a
        href={`https://github.com/KittySparkles/stormbound-kitty/pull/${props.pr}`}
      >
        pull-request #{props.pr}
      </a>
      ).
    </FeedEntry>
  )
})
