import React from 'react'
import { ImageSupportContext } from '../ImageSupportProvider'

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

export default React.forwardRef(function Image(props, ref) {
  const ext = useFileExtension({
    withAvif: props.withAvif && props.src.startsWith('/assets/images'),
    withoutWebp: props.withoutWebp || !props.src.startsWith('/assets/images'),
  })

  return (
    <img
      src={props.src.replace('png', ext)}
      alt={props.alt || ''}
      className={props.className}
      data-testid={props['data-testid']}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    />
  )
})
