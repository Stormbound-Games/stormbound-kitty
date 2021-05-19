import React from 'react'
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

export default React.memo(function BattleSimBoardDesktop(props) {
  return (
    <div
      className={[
        'BattleSimBoardDesktop',
        `BattleSimBoardDesktop--${props.environment || faction}`,
      ].join(' ')}
      data-testid='board'
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
