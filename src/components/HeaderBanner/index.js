import React from 'react'
import { WebpContext } from '../WebpProvider'
import './index.css'

export default React.memo(function HeaderBanner(props) {
  const supportsWebp = React.useContext(WebpContext)
  const ext = supportsWebp ? 'webp' : 'png'
  const background = (
    props.background || '/assets/images/environment_neutral.png'
  ).replace('png', ext)

  return (
    <header
      className='HeaderBanner'
      style={{
        backgroundImage: `url(${background})`,
        '--ratio': props.ratio,
      }}
    >
      <h1 className='HeaderBanner__title' title={props.title}>
        {props.title}
      </h1>
    </header>
  )
})
