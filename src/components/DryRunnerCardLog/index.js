import React from 'react'
import Column from '../Column'
import Image from '../Image'
import Row from '../Row'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

const DryRunnerCardLog = props =>
  React.useMemo(() => {
    const cards = arrayPad(props.cards.slice(0, 6), 6, null, +1)
    return (
      <div className='DryRunnerCardLog'>
        <Row>
          {cards.map((card, index) => (
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
  }, [props.cards])

export default DryRunnerCardLog
