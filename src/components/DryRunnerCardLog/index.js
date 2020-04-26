import React from 'react'
import Column from '../Column'
import Image from '../Image'
import Row from '../Row'
import './index.css'

const DryRunnerCardLog = props => {
  return (
    <div className='DryRunnerCardLog'>
      <Row>
        {props.cards.slice(0, 6).map((card, index) => (
          <Column width={1 / 6} key={card.id + ' #' + index}>
            <Image
              className='DryRunnerCardLog__image'
              src={card.image}
              alt={card.name}
            />
          </Column>
        ))}
      </Row>
    </div>
  )
}

export default DryRunnerCardLog
