import React from 'react'
import { useFela } from 'react-fela'
import DiamondButton from '../DiamondButton'
import Image from '../Image'
import styles from './styles'

export default React.memo(function FanKitItem(props) {
  const { css } = useFela()

  return (
    <div
      className={css(styles.item)}
      data-testid='fan-kit-item'
      style={{ '--width': props.width, '--height': props.height }}
    >
      <span className={css(styles.download)}>
        <DiamondButton
          data-testid='fan-kit-download-btn'
          onClick={() => props.setActive(props.id)}
          title={'Download asset ' + props.name}
          icon='download'
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
        withoutWebp={props.withoutWebp}
        withAvif={props.withAvif}
      />
    </div>
  )
})
