import React from 'react'
import Image from '../Image'
import './index.css'

export default React.memo(function ResourceIcon(props) {
  switch (props.resource) {
    case 'COMMON':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/card/rarity-common.png'
          alt='common card'
        />
      )
    case 'RARE':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/card/rarity-rare.png'
          alt='rare card'
        />
      )
    case 'EPIC':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/card/rarity-epic.png'
          alt='epic card'
        />
      )
    case 'LEGENDARY':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/card/rarity-legendary.png'
          alt='legendary card'
        />
      )
    case 'COIN':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/iconography/coin.png'
          alt='coin'
        />
      )
    case 'STONE':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/iconography/stones.png'
          alt='fusion stone'
        />
      )
    case 'RUBY':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/iconography/ruby.png'
          alt='ruby'
        />
      )
    case 'CROWN':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/iconography/crown_icon.png'
          alt='crown'
        />
      )
    case 'HERO_CROWN':
      return (
        <Image
          className='ResourceIcon'
          src='/assets/images/iconography/elo_icon.png'
          alt='elo crown'
        />
      )
    default:
      return null
  }
})
