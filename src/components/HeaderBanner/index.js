import React from 'react'
import { useFela } from 'react-fela'
import Only from '~/components/Only'
import Spacing from '~/components/Spacing'
import styles from './styles'

const DEFAULT_BANNER =
  'https://cdn.sanity.io/images/5hlpazgd/production/420b74535722f3b2fc260fe253e48bf73b0789bf-1200x300.jpg'

const useCoverImage = props => {
  let source = props.background || DEFAULT_BANNER

  // If an image is served from the CDN, ensure it’s optimized.
  if (source.startsWith('https://cdn.sanity.io/')) {
    if (!source.includes('auto=format')) {
      source += (source.includes('?') ? '&' : '?') + 'auto=format'
    }

    if (!source.includes('w=1200')) {
      source += (source.includes('?') ? '&' : '?') + 'w=1200'
    }

    if (!source.includes('q=')) {
      source += (source.includes('?') ? '&' : '?') + 'q=90'
    }

    return source
  } else {
    return source
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
          {/* eslint-disable-next-line */}
          <img src={background} alt='' hidden />
        </Only.Desktop>
        <h1 className={css(styles.title)}>{props.title}</h1>
      </div>
    </Spacing>
  )
})
