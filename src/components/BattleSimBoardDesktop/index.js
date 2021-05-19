import React from 'react'
import { ImageSupportContext } from '../ImageSupportProvider'
import BaseHealth from '../BattleSimBaseHealth'
import Cards from '../BattleSimCards'
import CardZoom from '../CardZoom'
import Grid from '../BattleSimGrid'
import PlayerBanner from '../BattleSimPlayerBanner'
import arrayRandom from '../../helpers/arrayRandom'
import { FACTIONS } from '../../constants/game'
import './index.css'

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
  const { supportsAvif, supportsWebp } = React.useContext(ImageSupportContext)
  const ext = supportsAvif ? 'avif' : supportsWebp ? 'webp' : 'png'
  const environment = props.environment || faction
  const [redHealth, blueHealth] = POSITIONS[environment]

  return (
    <div
      className='BattleSimBoardDesktop'
      data-testid='board'
      style={{
        backgroundImage: `url('https://stormbound-kitty.com/assets/images/backgrounds/lite/${environment}.${ext}')`,
        '--red-health-y': redHealth[0],
        '--red-health-x': redHealth[1],
        '--blue-health-y': blueHealth[0],
        '--blue-health-x': blueHealth[1],
      }}
    >
      <div className='BattleSimBoardDesktop__health BattleSimBoardDesktop__health--RED'>
        <BaseHealth player='RED' health={props.players.RED.health} />
      </div>

      <div className='BattleSimBoardDesktop__player BattleSimBoardDesktop__player--RED'>
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

      <div className='BattleSimBoardDesktop__grid '>
        <Grid {...props} />
      </div>

      <div className='BattleSimBoardDesktop__health BattleSimBoardDesktop__health--BLUE'>
        <BaseHealth player='BLUE' health={props.players.BLUE.health} />
      </div>

      <div className='BattleSimBoardDesktop__player BattleSimBoardDesktop__player--BLUE'>
        <PlayerBanner
          player='BLUE'
          faction={props.players.BLUE.faction}
          mana={props.mana}
        />
      </div>

      <div className='BattleSimBoardDesktop__cards'>
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
