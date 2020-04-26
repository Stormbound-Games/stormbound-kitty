import React from 'react'
import Column from '../Column'
import Row from '../Row'
import Image from '../Image'
import './index.css'

const CardLog = props => {
  return (
    <div className='CardLog__container'>
      <Row>
        {props.cards
          .filter((_, index) => index < 6)
          .map((i, index) => {
            return (
              <Column
                key={
                  i.id +
                  ' #' +
                  props.cards.filter(card => card.id === i.id).length
                }
                width={25}
              >
                <Image
                  className={
                    'CardLog__image' +
                    (index === 0 ? ' CardLog__latest_image' : '')
                  }
                  src={i.image}
                  alt={i.name}
                />
              </Column>
            )
          })}
      </Row>
    </div>
  )
}

export default CardLog
