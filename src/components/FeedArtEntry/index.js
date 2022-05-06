import React from 'react'
import CardLink from '~/components/CardLink'
import FeedDetailDisplay from '~/components/FeedDetailDisplay'
import FeedEntry from '~/components/FeedEntry'
import Image from '~/components/Image'

export default React.memo(function FeedArtEntry(props) {
  const { width, height } = props.dimensions
  const displayWidth = 450
  const displayHeight = Math.round((displayWidth / width) * height)
  const dimensions =
    '?auto=format&w=' + displayWidth + '&h=' + displayHeight + '&q=90'

  return (
    <FeedEntry icon='image' date={props.date}>
      {props.user.name} has made some art
      {props.card ? (
        <>
          {' '}
          about <CardLink id={props.card} />
        </>
      ) : null}
      .
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
