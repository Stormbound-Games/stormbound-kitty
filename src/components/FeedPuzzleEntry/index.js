import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedPuzzleEntry(props) {
  return (
    <FeedEntry icon='sword' date={props.date}>
      {props.user.name} has created a {props.category.toLowerCase()} puzzle
      called <Link to={'/puzzles/' + props.slug}>{props.name}</Link>.
    </FeedEntry>
  )
})
