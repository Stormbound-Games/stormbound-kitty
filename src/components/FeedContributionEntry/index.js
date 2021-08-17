import React from 'react'
import FeedEntry from '~/components/FeedEntry'
import Link from '~/components/Link'
import CONTRIBUTIONS from '~/data/contributions'

export default React.memo(function FeedContributionEntry(props) {
  const { author: name } = CONTRIBUTIONS.find(
    entry => entry.author.toLowerCase() === props.user
  )
  return (
    <FeedEntry icon='hammer' date={props.date}>
      {name} has kindly contributed to the code of the site (pull-request
      {props.entries.length > 1 ? 's' : ''}{' '}
      {props.entries.reduce(
        (acc, pr, index) => (
          <>
            {acc}
            {index !== 0 ? ', ' : ''}
            <Link
              href={`https://github.com/KittySparkles/stormbound-kitty/pull/${pr}`}
            >
              #{pr}
            </Link>
          </>
        ),
        <></>
      )}
      ).
    </FeedEntry>
  )
})
