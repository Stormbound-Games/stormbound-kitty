import React from 'react'
import Grid from '../BattleSimGrid'
import Cards from '../BattleSimCards'
import CardZoom from '../CardZoom'
import BaseHealth from '../BattleSimBaseHealth'
import PlayerBanner from '../BattleSimPlayerBanner'
import './index.css'

const BattleSimBoardMobile = props => (
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

    <CardZoom
      cardId={props.zoomed ? props.zoomed.id : null}
      level={props.zoomed ? props.zoomed.level : null}
      player={props.zoomed ? props.zoomed.player : null}
      close={props.unzoom}
    />

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

export default BattleSimBoardMobile
