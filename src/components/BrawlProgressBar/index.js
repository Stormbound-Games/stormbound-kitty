import React from 'react'
import './index.css'

export default React.memo(function BrawlProgressBar(props) {
  const progress = Math.min((props.value / props.max) * 100, 100)

  return (
    <div className='BrawlProgressBar'>
      <div
        className='BrawlProgressBar__inner'
        style={{ width: progress + '%' }}
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-hidden
      ></div>
      <span className='BrawlProgressBar__label'>{props.label}</span>
    </div>
  )
})
