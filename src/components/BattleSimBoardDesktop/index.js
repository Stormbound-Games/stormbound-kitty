import React from 'react'
import { useFela } from 'react-fela'
import { ImageSupportContext } from '~/components/ImageSupportProvider'
import BaseHealth from '~/components/BattleSimBaseHealth'
import Cards from '~/components/BattleSimCards'
import CardZoom from '~/components/CardZoom'
import Grid from '~/components/BattleSimGrid'
import PlayerBanner from '~/components/BattleSimPlayerBanner'
import arrayRandom from '~/helpers/arrayRandom'
import { FACTIONS } from '~/constants/game'
import styles from './styles'

// Because the faction is picked at random, it needs to be defined outside of
// the memoised component.
const faction = arrayRandom(
  Object.keys(FACTIONS)
    .filter(f => f !== 'neutral')
    .concat(['dragon', 'neutral', 'feline'])
)

const POSITIONS = {
  dragon: [['3.25%'], ['66.3%']],
  feline: [['2.15%'], ['68%']],
  ironclad: [['4.8%'], ['65%']],
  neutral: [['4.45%'], ['66.3%']],
  shadowfen: [['4.8%'], ['66%']],
  swarm: [
    ['5.5%', '-40%'],
    ['67.3%', '-75%'],
  ],
  winter: [['5.75%'], ['66.3%']],
}

export default React.memo(function BattleSimBoardDesktop(props) {
  const { css } = useFela()
  const { supportsAvif, supportsWebp } = React.useContext(ImageSupportContext)
  const ext = supportsAvif ? 'avif' : supportsWebp ? 'webp' : 'png'
  const environment = props.environment || faction
  const [redHealth, blueHealth] = POSITIONS[environment]

  return (
    <div
      className={css(styles.root)}
      data-testid='board'
      style={{
        backgroundImage: `url('https://stormbound-kitty.com/assets/images/backgrounds/lite/${environment}.${ext}')`,
        '--red-health-y': redHealth[0],
        '--red-health-x': redHealth[1],
        '--blue-health-y': blueHealth[0],
        '--blue-health-x': blueHealth[1],
      }}
    >
      <div className={css(styles.health({ type: 'RED' }))}>
        <BaseHealth player='RED' health={props.players.RED.health} />
      </div>

      <div className={css(styles.player({ type: 'RED' }))}>
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

      <div className={css(styles.health({ type: 'BLUE' }))}>
        <BaseHealth player='BLUE' health={props.players.BLUE.health} />
      </div>

      <div className={css(styles.player({ type: 'BLUE' }))}>
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
