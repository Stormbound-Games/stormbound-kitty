import React from 'react'
import Grid from '../BSGrid'
import Cards from '../BSCards'
import CardZoom from '../CardZoom'
import BaseHealth from '../BSBaseHealth'
import PlayerBanner from '../BSPlayerBanner'
import './index.css'

const BSBoardMobile = props => (
  <div className='BSBoardMobile' data-testid='board'>
    <div className='BSBoardMobile__health BSBoardMobile__health--RED'>
      <BaseHealth player='RED' health={props.players.RED.health} />
    </div>

    <div className='BSBoardMobile__player BSBoardMobile__player--RED'>
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

    <div className='BSBoardMobile__grid '>
      <Grid {...props} />
    </div>

    <div className='BSBoardMobile__health BSBoardMobile__health--BLUE'>
      <BaseHealth player='BLUE' health={props.players.BLUE.health} />
    </div>

    <div className='BSBoardMobile__player BSBoardMobile__player--BLUE'>
      <PlayerBanner
        player='BLUE'
        faction={props.players.BLUE.faction}
        mana={props.mana}
      />
    </div>

    <div className='BSBoardMobile__cards'>
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

export default BSBoardMobile
