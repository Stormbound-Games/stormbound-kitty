import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import toSentence from '~/helpers/toSentence'

const toArray = value => (Array.isArray(value) ? value : [value])

export default React.memo(function FeedSWCCEntry(props) {
  const authors = props.authors || toArray(props.author)
  const verb = authors.length === 1 ? 'has' : 'have'

  return (
    <FeedEntry icon='hammer' date={props.date}>
      {toSentence(authors)} {verb} started a new season of the{' '}
      <Link to='/card/contest'>Stormbound Weekly Card Contest</Link> (SWCC for
      short).
    </FeedEntry>
  )
})
