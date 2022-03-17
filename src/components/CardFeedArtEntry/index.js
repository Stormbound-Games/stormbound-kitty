import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import FeedEntry from '~/components/FeedEntry'
import Link from '~/components/Link'

export default React.memo(function CardFeedArtEntry(props) {
  const { css } = useFela()
  const { width, height } = props.dimensions
  const displayWidth = 450
  const displayHeight = Math.round((displayWidth / width) * height)
  const dimensions =
    '?auto=format&w=' + displayWidth + '&h=' + displayHeight + '&q=90'

  return (
    <FeedEntry icon='image' date={props.date}>
      <Link to={'/members/' + props.user.slug}>{props.user.name}</Link> has made
      some art about this card.
      <details className={css({ maxWidth: displayWidth + 'px' })}>
        <summary className={css({ marginBottom: 'var(--s-base)' })}>
          + Toggle art display
        </summary>
        <Image
          src={props.image + dimensions}
          alt={'Artwork by' + props.user.name}
        />
      </details>
    </FeedEntry>
  )
})
