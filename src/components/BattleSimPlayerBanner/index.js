import React from 'react'
import Mana from '../Mana'
import Image from '../Image'
import './index.css'

const BattleSimPlayerBanner = props => (
  <div className='BattleSimPlayerBanner'>
    <Mana mana={props.mana} disabled={props.disabled} />
    <div className='BattleSimPlayerBanner__meta'>
      <span className='BattleSimPlayerBanner__name'>{props.player}</span>
      <span
        className='BattleSimPlayerBanner__faction'
        data-testid={`${props.player}-faction`}
      >
        <Image
          className='BattleSimPlayerBanner__faction-icon'
          src={
            process.env.PUBLIC_URL +
            '/assets/images/icon_' +
            (props.faction || 'neutral') +
            '.png'
          }
          alt=''
        />

        {props.faction || 'Neutral'}
      </span>
    </div>
  </div>
)

export default BattleSimPlayerBanner
