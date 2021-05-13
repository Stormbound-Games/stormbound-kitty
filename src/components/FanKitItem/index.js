import React from 'react'
import DiamondButton from '../DiamondButton'
import Image from '../Image'
import './index.css'

export default React.memo(function FanKitItem(props) {
  return (
    <div
      className='FanKitItem'
      data-testid='fan-kit-item'
      style={{ '--width': props.width, '--height': props.height }}
    >
      <span className='FanKitItem__download'>
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
        className='FanKitItem__image'
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
