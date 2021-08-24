import React from 'react'
import { useFela } from 'react-fela'
import { ImageSupportContext } from '~/components/ImageSupportProvider'
import Only from '~/components/Only'
import Spacing from '~/components/Spacing'
import styles from './styles'

const DEFAULT_BANNER = '/assets/images/banners/default_banner.jpg'

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
    <Spacing bottom={['BASE', 'LARGEST']}>
      <header
        className={css(styles.banner)}
        style={{
          '--image': `url(${background})`,
          '--ratio': props.ratio,
        }}
      >
        <Only.Desktop>
          <img src={background} alt='' hidden />
        </Only.Desktop>
        <h1 className={css(styles.title)}>{props.title}</h1>
      </header>
    </Spacing>
  )
})
