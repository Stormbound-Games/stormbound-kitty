import React from 'react'
import Image from '../Image'
import './index.css'

export default React.memo(function ResourceIcon(props) {
  switch (props.resource) {
    case 'COIN':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/coin.png'
          alt='coin'
        />
      )
    case 'STONE':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/stones.png'
          alt='fusion stone'
        />
      )
    case 'RUBY':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/RUBIES.png'
          alt='ruby'
        />
      )
    case 'CROWN':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/crown_icon.png'
          alt='crown'
        />
      )
    default:
      return null
  }
})
