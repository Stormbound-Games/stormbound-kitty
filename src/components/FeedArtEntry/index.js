import React from 'react'
import FeedEntry from '../FeedEntry'
import Only from '../Only'
import './index.css'

export default React.memo(function FeedArtEntry(props) {
  return (
    <FeedEntry icon='image' date={props.date}>
      {props.author} has made some art.
      <details>
        <summary>
          <Only.Desktop>Click</Only.Desktop>
          <Only.Mobile>Tap</Only.Mobile> to toggle art display
        </summary>
        <img
          src={'/assets/images/art/' + props.image}
          alt={'Artwork by' + props.author}
          className='FeedArtEntry__image'
        />
      </details>
    </FeedEntry>
  )
})
