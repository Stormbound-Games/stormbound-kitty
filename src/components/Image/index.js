import React from 'react'
import { useFela } from 'react-fela'
import { PageContext } from '~/components/Page'
import useImageSupport from '~/hooks/useImageSupport'

const useFileExtension = ({ withAvif, withoutWebp }) => {
  const { supportsWebp, supportsAvif } = useImageSupport()

  if (supportsAvif && withAvif) return 'avif'
  if (supportsWebp && !withoutWebp) return 'webp'
  return 'png'
}

const useSource = props => {
  const ext = useFileExtension({
    withAvif: props.withAvif,
    withoutWebp: props.withoutWebp,
  })

  // If an image is rendered without a source, return an empty string.
  if (!props.src) return ''

  // If an image is served from the CDN, ensure it’s optimized.
  if (props.src.startsWith('https://cdn.sanity.io/')) {
    let source = props.src

    if (!source.includes('auto=format')) {
      source += (source.includes('?') ? '&' : '?') + 'auto=format'
    }

    if (!source.includes('w=') && props.width) {
      source += (source.includes('?') ? '&' : '?') + 'w=' + props.width
    }

    if (!source.includes('q=')) {
      source += (source.includes('?') ? '&' : '?') + 'q=90'
    }

    return source
  }

  // If the image is self-hosted, optimize it’s format.
  if (props.src.startsWith('/assets/images')) {
    return props.src.replace('png', ext)
  }

  // Otherwise just return the source as given.
  return props.src
}

export default React.memo(function Image(props) {
  const { css } = useFela()
  const { isEditorialContent } = React.useContext(PageContext)
  const src = useSource(props)

  return (
    // eslint-disable-next-line
    <img
      loading={props.lazy ? 'lazy' : undefined}
      width={props.width}
      height={props.height}
      src={src}
      alt={props.alt || ''}
      className={css(
        {
          display: 'block',
          height: 'auto',
          maxWidth: '100%',
          margin: isEditorialContent ? 'var(--s-large) auto' : undefined,
        },
        props.extend
      )}
      style={props.style}
      data-testid={props['data-testid']}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    />
  )
})
