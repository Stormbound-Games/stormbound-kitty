import React from 'react'
import { WebpContext } from '../WebpProvider'

export default React.forwardRef(function Image(props, ref) {
  const supportsWebp = React.useContext(WebpContext)
  const ext = supportsWebp ? 'webp' : 'png'

  return (
    <img
      src={
        props.src.startsWith('/assets')
          ? props.src.replace('png', ext)
          : props.src
      }
      alt={props.alt || ''}
      className={props.className}
      data-testid={props['data-testid']}
      onClick={props.onClick}
    />
  )
})
