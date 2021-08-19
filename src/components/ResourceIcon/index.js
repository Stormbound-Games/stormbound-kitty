import React from 'react'
import Image from '~/components/Image'
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
          width={11}
          height={14}
          lazy
        />
      )
    case 'RARE':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_rare_4.png'
          alt='rare card'
          withoutWebp
          width={11}
          height={14}
          lazy
        />
      )
    case 'EPIC':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_epic_4.png'
          alt='epic card'
          withoutWebp
          width={11}
          height={14}
          lazy
        />
      )
    case 'LEGENDARY':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/card/rarity_legendary_4.png'
          alt='legendary card'
          withoutWebp
          width={11}
          height={14}
          lazy
        />
      )
    case 'COIN':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/coin.png'
          alt='coin'
          width={18}
          height={18}
          lazy
        />
      )
    case 'STONE':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/stones.png'
          alt='fusion stone'
          width={14}
          height={18}
          lazy
        />
      )
    case 'RUBY':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/ruby.png'
          alt='ruby'
          width={18}
          height={18}
          lazy
        />
      )
    case 'CROWN':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/crown_icon.png'
          alt='crown'
          width={18}
          height={18}
          lazy
        />
      )
    case 'HERO_CROWN':
      return (
        <Image
          extend={styles.icon}
          src='/assets/images/iconography/elo_icon.png'
          alt='elo crown'
          width={14}
          height={14}
          lazy
        />
      )
    default:
      return null
  }
})
