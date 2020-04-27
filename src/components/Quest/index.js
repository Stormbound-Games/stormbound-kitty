import React from 'react'
import Image from '../Image'
import './index.css'

export default React.memo(function Quest(props) {
  return (
    <div className='Quest'>
      <div className='Quest__inner'>
        <span
          className={`Quest__difficulty Quest__difficulty--${props.difficulty}`}
        >
          <span className='VisuallyHidden'>Difficulty {props.difficulty}</span>
          <span className='Quest__difficulty-diamond Quest__difficulty-diamond--1' />
          {props.difficulty > 1 && (
            <span className='Quest__difficulty-diamond Quest__difficulty-diamond--2' />
          )}
          {props.difficulty > 2 && (
            <span className='Quest__difficulty-diamond Quest__difficulty-diamond--3' />
          )}
        </span>
        <div className='Quest__content'>
          <span className='Quest__name'>{props.name}</span>
          <p className='Quest__description'>{props.description}</p>
        </div>
        <div className='Quest__reward'>
          <Image
            className='Quest__currency-image'
            src={`/assets/images/${props.currency}.png`}
            alt={props.currency}
          />
          <span className='Quest__amount'>
            <span className='Quest__number'>{props.amount}</span>{' '}
            <span className='Quest__currency'>
              {props.currency.toLowerCase().replace('_', ' ')}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
})
