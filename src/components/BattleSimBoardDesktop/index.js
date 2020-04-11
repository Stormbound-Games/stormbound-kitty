import React from 'react'
import Grid from '../BattleSimGrid'
import Cards from '../BattleSimCards'
import CardZoom from '../CardZoom'
import BaseHealth from '../BattleSimBaseHealth'
import PlayerBanner from '../BattleSimPlayerBanner'
import arrayRandom from '../../helpers/arrayRandom'
import { FACTIONS } from '../../constants/game'
import './index.css'

const faction = arrayRandom(Object.keys(FACTIONS).filter(f => f !== 'neutral'))

const BattleSimBoardDesktop = props => (
  <div
    className={[
      'BattleSimBoardDesktop',
      `BattleSimBoardDesktop--${faction}`,
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

    <CardZoom
      cardId={props.zoomed ? props.zoomed.id : null}
      level={props.zoomed ? props.zoomed.level : null}
      player={props.zoomed ? props.zoomed.player : null}
      close={props.unzoom}
    />

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
        canDrawCard={props.canDrawCard}
        cycleCard={props.cycleCard}
        canCycleCard={props.canCycleCard}
      />
    </div>
  </div>
)

export default BattleSimBoardDesktop
