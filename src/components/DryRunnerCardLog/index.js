import React from 'react'
import Column from '../Column'
import Row from '../Row'
import Image from '../Image'
import './index.css'

const DryRunnerCardLog = props => {
  return (
    <div className='DryRunnerCardLog__container'>
      <Row>
        {props.cards.slice(0, 6).map((card, index) => {
          return (
            <Column key={card.id + ' #' + index} width={25}>
              <Image
                className={
                  'DryRunnerCardLog__image' +
                  (index === 0 ? 'DryRunnerCardLog__image--latest' : '')
                }
                src={card.image}
                alt={card.name}
              />
            </Column>
          )
        })}
      </Row>
    </div>
  )
}

export default DryRunnerCardLog
