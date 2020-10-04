import React from 'react'
import Image from '../Image'
import Mana from '../Mana'
import './index.css'

export default React.memo(function BattleSimPlayerBanner(props) {
  return (
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
