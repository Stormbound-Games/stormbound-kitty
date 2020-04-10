import React from 'react'
import './index.css'

const BSBaseHealth = props => {
  return (
    <div className='BSBaseHealth'>
      <span
        className='BSBaseHealth__value'
        data-testid={`${props.player}-health`}
      >
        {props.health}
      </span>
    </div>
  )
}

export default BSBaseHealth
