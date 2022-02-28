import React from 'react'
import { useFela } from 'react-fela'
import { ImageSupportContext } from '~/components/ImageSupportProvider'
import Only from '~/components/Only'
import Spacing from '~/components/Spacing'
import styles from './styles'

const DEFAULT_BANNER =
  'https://cdn.sanity.io/images/5hlpazgd/production/420b74535722f3b2fc260fe253e48bf73b0789bf-1200x300.jpg'

const useFileExtension = ({ fileType, withAvif, withoutWebp }) => {
  const { supportsWebp, supportsAvif } = React.useContext(ImageSupportContext)

  if (supportsAvif && withAvif) return 'avif'
  if (supportsWebp && !withoutWebp) return 'webp'
  return fileType
}

const useCoverImage = props => {
  const fileType = props.background?.split('.').pop() ?? 'jpg'
  const ext = useFileExtension({
    // The `DEFAULT_BANNER` image has an AVIF version ready, so if there is no
    // background provided, it means the default banner will be used, and AVIF
    // can be used.
    withAvif: props.withAvif || !props.background,
    withoutWebp: props.withoutWebp,
    fileType,
  })

  let source = props.background || DEFAULT_BANNER

  // If an image is served from the CDN, ensure it’s optimized.
  if (source.startsWith('https://cdn.sanity.io')) {
    // If the image already provides auto=format, avoid adding it again.
    if (!source.includes('auto=format')) {
      source += (source.includes('?') ? '&' : '?') + 'auto=format'
    }

    // If the image already provides w= or doesn’t have an explicit width, avoid
    // adding it again.
    if (!source.includes('w=1200')) {
      source += (source.includes('?') ? '&' : '?') + 'w=1200'
    }

    return source
  } else {
    return source.replace(fileType, ext)
  }
}

export default React.memo(function HeaderBanner(props) {
  const { css } = useFela()
  const background = useCoverImage(props)

  return (
    <Spacing bottom={['BASE', 'LARGEST']}>
      <div
        className={css(styles.banner)}
        style={{ '--image': `url(${background})`, '--ratio': props.ratio }}
      >
        <Only.Desktop>
          <img src={background} alt='' hidden />
        </Only.Desktop>
        <h1 className={css(styles.title)}>{props.title}</h1>
      </div>
    </Spacing>
  )
})
