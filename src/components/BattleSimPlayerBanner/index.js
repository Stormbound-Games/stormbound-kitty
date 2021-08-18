import React from 'react'
import { useFela } from 'react-fela'
import Image from '~/components/Image'
import Mana from '~/components/Mana'
import styles from './styles'

export default React.memo(function BattleSimPlayerBanner(props) {
  const { css } = useFela()

  return (
    <div className={css(styles.banner)}>
      <Mana mana={props.mana} disabled={props.disabled} />
      <div className={css(styles.meta)}>
        <span>{props.player}</span>
        <span
          className={css(styles.faction)}
          data-testid={`${props.player}-faction`}
        >
          <Image
            extend={styles.factionIcon}
            src={
              '/assets/images/iconography/icon_' +
              (props.faction || 'neutral') +
              '.png'
            }
          />

          {props.faction || 'Neutral'}
        </span>
      </div>
    </div>
  )
})
