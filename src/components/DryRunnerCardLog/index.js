import React from 'react'
import CardLogSeparator from '../CardLogSeparator'
import CardZoom from '../CardZoom'
import Column from '../Column'
import Image from '../Image'
import Row from '../Row'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

export default React.memo(function DryRunnerCardLog(props) {
  const [zoomedCard, setZoomedCard] = React.useState(null)
  const cards = arrayPad(props.cards.slice(0, 6), 6, null, +1)
  console.log(props.cardsThisTurn)

  return (
    <>
      {zoomedCard && (
        <CardZoom
          cardId={zoomedCard.id}
          level={zoomedCard.level}
          close={() => setZoomedCard(undefined)}
        />
      )}
      <h2 className='DryRunnerCardLog__title'>Last played cards</h2>
      <div className='DryRunnerCardLog__container'>
        <Row>
          {cards.map((card, index) => (
            <>
              <Column
                style={{ opacity: 1 - index / 8 }}
                width='1/6'
                key={(card ? card.id : '') + '#' + index}
              >
                {card && (
                  <Image
                    wrapperClassName='DryRunnerCardLog__image-wrapper'
                    className={'DryRunnerCardLog__image'}
                    src={card.image}
                    alt={card.name}
                    onClick={() => setZoomedCard(card)}
                    data-testid='card-log-image'
                  />
                )}
              </Column>
              {props.cardsThisTurn === index + 1 && index !== 5 && (
                <CardLogSeparator />
              )}
            </>
          ))}
        </Row>
      </div>
    </>
  )
})
