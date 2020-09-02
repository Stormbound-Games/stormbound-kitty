import React from 'react'
import './index.css'

export default React.memo(function Table(props) {
  return (
    <table
      className={['Table', props.zebra && 'Table--zebra', props.className]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </table>
  )
})
