import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CardZoom from '../CardZoom'
import Column from '../Column'
import Row from '../Row'
import arrayPad from '../../helpers/arrayPad'
import './index.css'

export default React.memo(function DryRunnerCardLog(props) {
  const [zoomedCard, setZoomedCard] = React.useState(null)
  const cards = arrayPad(props.cards.slice(0, 6), 6, null, +1)

  return (
    <>
      {zoomedCard && (
        <CardZoom
          cardId={zoomedCard.id}
          {...zoomedCard}
          close={() => setZoomedCard(undefined)}
        />
      )}
      <h2 className='DryRunnerCardLog__title'>Last played cards</h2>
      <div className='DryRunnerCardLog__container' data-testid='card-log'>
        <Row>
          {cards.map((card, index) => (
            <Column
              style={{ opacity: 1 - index / 8 }}
              width='1/6'
              key={(card ? card.id + '_' + card.idx : '') + '_' + index}
            >
              <AnimatePresence>
                {card && (
                  <motion.div
                    key={card.id + '_' + card.idx}
                    initial={{ scale: Math.min(index, 1) }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className={[
                      'DryRunnerCardLog__image-wrapper',
                      props.cardsThisTurn === index + 1 &&
                        index !== 5 &&
                        'DryRunnerCardLog__image-wrapper--turn',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <img
                      className={'DryRunnerCardLog__image'}
                      src={card.image}
                      alt={card.name}
                      onClick={() => setZoomedCard(card)}
                      data-testid='card-log-image'
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Column>
          ))}
        </Row>
      </div>
    </>
  )
})
