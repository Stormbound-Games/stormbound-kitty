import React from 'react'
import Mana from '../Mana'
import Image from '../Image'
import './index.css'

const BSPlayerBanner = props => {
  return (
    <div className='BSPlayerBanner'>
      <Mana mana={props.mana} disabled={props.disabled} />
      <div className='BSPlayerBanner__meta'>
        <span className='BSPlayerBanner__name'>{props.player}</span>
        <span
          className='BSPlayerBanner__faction'
          data-testid={`${props.player}-faction`}
        >
          <Image
            className='BSPlayerBanner__faction-icon'
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
}

export default BSPlayerBanner
