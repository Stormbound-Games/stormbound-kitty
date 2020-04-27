import React from 'react'
import './index.css'

export default React.memo(function ProgressBar(props) {
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
})
