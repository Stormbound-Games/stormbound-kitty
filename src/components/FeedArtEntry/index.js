import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import FeedEntry from '~/components/FeedEntry'

export default React.memo(function FeedArtEntry(props) {
  const { css } = useFela()
  const { width, height } = props.dimensions
  const displayWidth = 450
  const displayHeight = Math.round((displayWidth / width) * height)
  const dimensions = '?auto=format&w=' + displayWidth + '&h=' + displayHeight

  return (
    <FeedEntry icon='image' date={props.date}>
      {props.user.name} has made some art.
      <details open className={css({ maxWidth: displayWidth + 'px' })}>
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
