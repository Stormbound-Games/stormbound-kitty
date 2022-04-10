import React from 'react'
import Image from '~/components/Image'
import FeedDetailDisplay from '~/components/FeedDetailDisplay'
import FeedEntry from '~/components/FeedEntry'
import Link from '~/components/Link'

export default React.memo(function CardFeedArtEntry(props) {
  const { width, height } = props.dimensions
  const displayWidth = 450
  const displayHeight = Math.round((displayWidth / width) * height)
  const dimensions =
    '?auto=format&w=' + displayWidth + '&h=' + displayHeight + '&q=90'

  return (
    <FeedEntry icon='image' date={props.date}>
      <Link to={'/members/' + props.user.slug}>{props.user.name}</Link> has made
      some art about this card.
      <FeedDetailDisplay label='artwork'>
        <Image
          extend={{ marginTop: 0 }}
          src={props.image + dimensions}
          alt={'Artwork by' + props.user.name}
        />
      </FeedDetailDisplay>
    </FeedEntry>
  )
})
