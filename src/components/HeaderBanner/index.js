import React from 'react'
import { useFela } from 'react-fela'
import { ImageSupportContext } from '../ImageSupportProvider'
import styles from './styles'

const DEFAULT_BANNER = '/assets/images/banners/default_banner.jpg'

// The reason AVIF is opt-in but WEBP is opt-out is because the WEBP version is
// automatically generated for all files with a script (although is sometimes
// larger than PNG, hence the need for a way out), while the AVIF version needs
// to be done by hand for every image.
const useFileExtension = ({ fileType, withAvif, withoutWebp }) => {
  const { supportsWebp, supportsAvif } = React.useContext(ImageSupportContext)

  if (supportsAvif && withAvif) return 'avif'
  if (supportsWebp && !withoutWebp) return 'webp'
  return fileType
}

export default React.memo(function HeaderBanner(props) {
  const { css } = useFela()
  const fileType = props.background?.split('.').pop() ?? 'jpg'
  const ext = useFileExtension({
    // The `DEFAULT_BANNER` image has an AVIF version ready, so if there is no
    // background provided, it means the default banner will be used, and AVIF
    // can be used.
    withAvif: props.withAvif || !props.background,
    withoutWebp: props.withoutWebp,
    fileType: fileType,
  })
  const background = (props.background || DEFAULT_BANNER).replace(fileType, ext)

  return (
    <header
      className={css(styles.banner)}
      style={{
        backgroundImage: `url(${background})`,
        '--ratio': props.ratio,
      }}
    >
      <img src={background} alt='' hidden />
      <h1 className={css(styles.title)}>{props.title}</h1>
    </header>
  )
})
