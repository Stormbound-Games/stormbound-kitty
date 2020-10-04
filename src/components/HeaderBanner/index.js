import React from 'react'
import { ImageSupportContext } from '../ImageSupportProvider'
import './index.css'

const DEFAULT_BANNER = '/assets/images/wallpapers/lite/wp-d-1.png'

export default React.memo(function HeaderBanner(props) {
  const { supportsWebp, supportsAvif } = React.useContext(ImageSupportContext)
  const webpExt = supportsWebp ? 'webp' : 'png'
  const avifExt = supportsAvif ? 'avif' : webpExt
  const defaultBg = DEFAULT_BANNER.replace('png', avifExt)
  const background =
    (props.background || '').replace('png', webpExt) || defaultBg

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
