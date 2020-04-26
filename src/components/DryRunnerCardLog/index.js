import React from 'react'
import Column from '../Column'
import Image from '../Image'
import Row from '../Row'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

const DryRunnerCardLog = React.memo(props => {
  const cards = arrayPad(props.cards.slice(0, 6), 6, null, +1)
  return (
    <>
      <h2 className='DryRunnerCardLog__title'>Last played cards</h2>
      <div className='DryRunnerCardLog__container'>
        <Row>
          {cards.map((card, index) => (
            <Column
              style={{ opacity: 1 - index / 8 }}
              width='1/6'
              key={(card ? card.id : '') + index}
            >
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
    </>
  )
})

export default DryRunnerCardLog
