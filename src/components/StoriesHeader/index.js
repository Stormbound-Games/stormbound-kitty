import React from 'react'
import { WebpContext } from '../WebpProvider'
import './index.css'

export default React.memo(function StoriesHeader(props) {
  const supportsWebp = React.useContext(WebpContext)
  const ext = supportsWebp ? 'webp' : 'png'
  const background = props.background.replace('png', ext)

  return (
    <header
      className='StoriesHeader'
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className='StoriesHeader__title' title={props.children}>
        {props.children}
      </h1>
    </header>
  )
})
