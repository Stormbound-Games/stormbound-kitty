import React from 'react'
import Image from '../Image'
import styles from './styles'

export default React.memo(function ResourceIcon(props) {
  switch (props.resource) {
    case 'COMMON':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_common_4.png'
          alt='common card'
          withoutWebp
        />
      )
    case 'RARE':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_rare_4.png'
          alt='rare card'
          withoutWebp
        />
      )
    case 'EPIC':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_epic_4.png'
          alt='epic card'
          withoutWebp
        />
      )
    case 'LEGENDARY':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_legendary_4.png'
          alt='legendary card'
          withoutWebp
        />
      )
    case 'COIN':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/coin.png'
          alt='coin'
        />
      )
    case 'STONE':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/stones.png'
          alt='fusion stone'
        />
      )
    case 'RUBY':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/ruby.png'
          alt='ruby'
        />
      )
    case 'CROWN':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/crown_icon.png'
          alt='crown'
        />
      )
    case 'HERO_CROWN':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/elo_icon.png'
          alt='elo crown'
        />
      )
    default:
      return null
  }
})
