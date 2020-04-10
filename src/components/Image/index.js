import React from 'react'

const Image = props => (
  <picture className={props.wrapperClassName}>
    {props.src.startsWith('/assets') && (
      <source srcSet={props.src.replace('.png', '.webp')} type='image/webp' />
    )}
    <source srcSet={props.src} type='image/jpeg' />
    <img
      src={props.src}
      alt={props.alt}
      className={props.className}
      data-testid={props['data-testid']}
    />
  </picture>
)

export default Image
