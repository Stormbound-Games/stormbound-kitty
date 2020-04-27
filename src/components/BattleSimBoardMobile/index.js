import React from 'react'
import BaseHealth from '../BattleSimBaseHealth'
import Cards from '../BattleSimCards'
import CardZoom from '../CardZoom'
import Grid from '../BattleSimGrid'
import PlayerBanner from '../BattleSimPlayerBanner'
import './index.css'

const BattleSimBoardMobile = React.memo(function BattleSimBoardMobile(props) {
  return (
    <div className='BattleSimBoardMobile' data-testid='board'>
      <div className='BattleSimBoardMobile__health BattleSimBoardMobile__health--RED'>
        <BaseHealth player='RED' health={props.players.RED.health} />
      </div>

      <div className='BattleSimBoardMobile__player BattleSimBoardMobile__player--RED'>
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

      <div className='BattleSimBoardMobile__grid '>
        <Grid {...props} />
      </div>

      <div className='BattleSimBoardMobile__health BattleSimBoardMobile__health--BLUE'>
        <BaseHealth player='BLUE' health={props.players.BLUE.health} />
      </div>

      <div className='BattleSimBoardMobile__player BattleSimBoardMobile__player--BLUE'>
        <PlayerBanner
          player='BLUE'
          faction={props.players.BLUE.faction}
          mana={props.mana}
        />
      </div>

      <div className='BattleSimBoardMobile__cards'>
        <Cards
          hand={props.hand}
          cards={props.cards}
          zoom={props.zoom}
          mana={props.mana}
          drawCard={props.drawCard}
          canDrawCard={props.canDrawCard}
          cycleCard={props.cycleCard}
          canCycleCard={props.canCycleCard}
        />
      </div>
    </div>
  )
})

export default BattleSimBoardMobile
