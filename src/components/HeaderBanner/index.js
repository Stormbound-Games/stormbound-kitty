import React from 'react'
import { ImageSupportContext } from '../ImageSupportProvider'
import './index.css'

const DEFAULT_BANNER = '/assets/images/wallpapers/lite/wp-d-1.png'

// The reason AVIF is opt-in but WEBP is opt-out is because the WEBP version is
// automatically generated for all files with a script (although is sometimes
// larger than PNG, hence the need for a way out), while the AVIF version needs
// to be done by hand for every image.
const useFileExtension = ({ withAvif, withoutWebp }) => {
  const { supportsWebp, supportsAvif } = React.useContext(ImageSupportContext)

  if (supportsAvif && withAvif) return 'avif'
  if (supportsWebp && !withoutWebp) return 'webp'
  return 'png'
}

export default React.memo(function HeaderBanner(props) {
  const ext = useFileExtension({
    // The `DEFAULT_BANNER` image has an AVIF version ready, so if there is no
    // background provided, it means the default banner will be used, and AVIF
    // can be used.
    withAvif: props.withAvif || !props.background,
    withoutWebp: props.withoutWebp,
  })
  const background = (props.background || DEFAULT_BANNER).replace('png', ext)

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
