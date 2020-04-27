import React from 'react'

export default React.forwardRef(function Image(props, ref) {
  return (
    <picture className={props.wrapperClassName} ref={ref}>
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
})
