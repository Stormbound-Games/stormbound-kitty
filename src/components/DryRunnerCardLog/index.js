import React from 'react'
import Column from '../Column'
import Image from '../Image'
import './index.css'

const DryRunnerCardLog = props => {
  return (
    <div className='DryRunnerCardLog'>
      {props.cards.slice(0, 6).map((card, index) => (
        <Column
          width='1/6'
          key={card.id + ' #' + index}
          style={{ flexGrow: 0 }}
        >
          <Image
            className='DryRunnerCardLog__image'
            src={card.image}
            alt={card.name}
          />
        </Column>
      ))}
    </div>
  )
}

export default DryRunnerCardLog
