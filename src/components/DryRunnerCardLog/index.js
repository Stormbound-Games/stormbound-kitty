import React from 'react'
import Column from '../Column'
import Image from '../Image'
import Row from '../Row'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

const DryRunnerCardLog = props => {
  return (
    <div className='DryRunnerCardLog'>
      <Row>
        {arrayPad(props.cards.slice(0, 6), 6, null, +1).map((card, index) => (
          <Column width='1/6' key={(card ? card.id : '') + index}>
            {card && (
              <Image
                wrapperClassName='DryRunnerCardLog__image-wrapper'
                className='DryRunnerCardLog__image'
                src={card.image}
                alt={card.name}
              />
            )}
          </Column>
        ))}
      </Row>
    </div>
  )
}

export default DryRunnerCardLog
