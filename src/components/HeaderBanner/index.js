import React from 'react'
import { useFela } from 'react-fela'
import { ImageSupportContext } from '~/components/ImageSupportProvider'
import Only from '~/components/Only'
import Spacing from '~/components/Spacing'
import styles from './styles'

const DEFAULT_BANNER =
  'https://cdn.sanity.io/images/5hlpazgd/production/420b74535722f3b2fc260fe253e48bf73b0789bf-1200x300.jpg?auto=format&w=1200'

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
    fileType: fileType,
  })

  if (props.background) {
    // Coming from the CDN, no optimization needed.
    if (props.background.startsWith('https://')) return props.background
    return props.background.replace(fileType, ext)
  }

  return DEFAULT_BANNER
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
