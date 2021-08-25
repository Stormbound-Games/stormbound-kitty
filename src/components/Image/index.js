import React from 'react'
import { useFela } from 'react-fela'
import { PageContext } from '~/components/Page'
import { ImageSupportContext } from '~/components/ImageSupportProvider'

const useFileExtension = ({ withAvif, withoutWebp }) => {
  const { supportsWebp, supportsAvif } = React.useContext(ImageSupportContext)

  if (supportsAvif && withAvif) return 'avif'
  if (supportsWebp && !withoutWebp) return 'webp'
  return 'png'
}

export default React.memo(function Image(props) {
  const { css } = useFela()
  const { isEditorialContent } = React.useContext(PageContext)
  const ext = useFileExtension({
    withAvif: props.withAvif && props.src.startsWith('/assets/images'),
    withoutWebp: props.withoutWebp || !props.src.startsWith('/assets/images'),
  })

  return (
    <img
      loading={props.lazy ? 'lazy' : undefined}
      width={props.width}
      height={props.height}
      src={props.src.replace('png', ext)}
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
