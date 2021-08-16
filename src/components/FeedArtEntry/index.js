import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import FeedEntry from '~/components/FeedEntry'
import Only from '~/components/Only'

export default React.memo(function FeedArtEntry(props) {
  const { css } = useFela()
  return (
    <FeedEntry icon='image' date={props.date}>
      {props.author} has made some art.
      <details>
        <summary className={css({ display: 'block' })}>
          <Only.Desktop>Click</Only.Desktop>
          <Only.Mobile>Tap</Only.Mobile> to toggle art display
        </summary>
        <Image
          src={'/assets/images/art/' + props.image}
          alt={'Artwork by' + props.author}
          extend={{ maxWidth: '450px', width: '100%' }}
          withoutWebp
        />
      </details>
    </FeedEntry>
  )
})
