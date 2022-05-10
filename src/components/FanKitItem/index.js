import React from 'react'
import { useFela } from 'react-fela'
import DiamondButton from '~/components/DiamondButton'
import Image from '~/components/Image'
import useIsMounted from '~/hooks/useIsMounted'
import track from '~/helpers/track'
import styles from './styles'

export default React.memo(function FanKitItem(props) {
  const { css } = useFela()
  const isMounted = useIsMounted()
  const extension = props.extension || 'png'

  return (
    <div
      className={css(styles.item, {
        medium: { aspectRatio: props.aspectRatio },
      })}
      data-testid='fan-kit-item'
    >
      <span className={css(styles.download)}>
        <DiamondButton
          data-testid='fan-kit-download-btn'
          onClick={() => {
            props.setActive(props.id)
            track('fankit_open', { id: props.id })
          }}
          label={'Download asset ' + props.name}
          icon='download'
          href={
            isMounted
              ? undefined
              : props.image +
                '?dl=' +
                encodeURIComponent(props.name + '.' + extension)
          }
        />
      </span>
      <Image
        src={props.image}
        alt={props.name}
        extend={styles.image}
        onContextMenu={event => {
          event.preventDefault()
          props.setActive(props.id)
        }}
        width={props.width}
        height={props.height}
        lazy
      />
    </div>
  )
})
