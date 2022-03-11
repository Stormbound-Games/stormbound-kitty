import React from 'react'
import { useFela } from 'react-fela'
import Image from 'next/image'
import BaseHealth from '~/components/BattleSimBaseHealth'
import Cards from '~/components/BattleSimCards'
import CardZoom from '~/components/CardZoom'
import Grid from '~/components/BattleSimGrid'
import PlayerBanner from '~/components/BattleSimPlayerBanner'
import styles from './styles'

export default React.memo(function BattleSimBoardMobile(props) {
  const { css } = useFela()
  return (
    <div className={css(styles.board)} data-testid='board'>
      <Image
        src='/assets/images/bg-swarm.jpg'
        alt='Mobile-format Swarm-themed battle background featuring the main interface elements from a Stormbound battle, especially the board'
        layout='fill'
        objectFit='cover'
        priority
      />

      <div className={css(styles.health({ player: 'RED' }))}>
        <BaseHealth player='RED' health={props.players.RED.health} />
      </div>

      <div className={css(styles.player({ player: 'RED' }))}>
        <PlayerBanner
          player='RED'
          faction={props.players.RED.faction}
          mana={props.mana}
          disabled
        />
      </div>

      {props.zoomed && (
        <CardZoom
          cardId={props.zoomed.id}
          level={props.zoomed.level}
          player={props.zoomed.player}
          close={props.unzoom}
        />
      )}

      <div className={css(styles.grid)}>
        <Grid {...props} />
      </div>

      <div className={css(styles.health({ player: 'BLUE' }))}>
        <BaseHealth player='BLUE' health={props.players.BLUE.health} />
      </div>

      <div className={css(styles.player({ player: 'BLUE' }))}>
        <PlayerBanner
          player='BLUE'
          faction={props.players.BLUE.faction}
          mana={props.mana}
        />
      </div>

      <div className={css(styles.cards)}>
        <Cards
          hand={props.hand}
          cards={props.cards}
          zoom={props.zoom}
          mana={props.mana}
          drawCard={props.drawCard}
          canDrawCard={props.mode !== 'DISPLAY' && props.canDrawCard}
          cycleCard={props.cycleCard}
          canCycleCard={props.mode !== 'DISPLAY' && props.canCycleCard}
        />
      </div>
    </div>
  )
})
