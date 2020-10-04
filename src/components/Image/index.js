import React from 'react'
import { ImageSupportContext } from '../ImageSupportProvider'

export default React.forwardRef(function Image(props, ref) {
  const { supportsWebp } = React.useContext(ImageSupportContext)
  const ext = supportsWebp && !props.noWepb ? 'webp' : 'png'

  return (
    <img
      src={
        props.src.startsWith('/assets/images') &&
        // It turns out Webp files are twice as heavy on average for the card
        // images, so it’s not worth at all.
        !props.src.startsWith('/assets/images/cards')
          ? props.src.replace('png', ext)
          : props.src
      }
      alt={props.alt || ''}
      className={props.className}
      data-testid={props['data-testid']}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    />
  )
})
