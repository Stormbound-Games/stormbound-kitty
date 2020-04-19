import React from 'react'
import './index.css'

const ProgressBar = props => {
  const progress = Math.min((props.value / props.max) * 100, 100)
  return (
    <div className='ProgressBar'>
      <div
        className='ProgressBar__inner'
        style={{ width: progress + '%' }}
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-hidden
      ></div>
    </div>
  )
}

export default ProgressBar
