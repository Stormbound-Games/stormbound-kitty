import React from 'react'
import { useFela } from 'react-fela'
import { AnimatePresence, motion } from 'framer-motion'
import CardZoom from '~/components/CardZoom'
import Image from '~/components/Image'
import arrayPad from '~/helpers/arrayPad'
import styles from './styles'

export default React.memo(function DryRunnerCardLog(props) {
  const { css } = useFela()
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
      <h2 className={css(styles.title)}>Last played cards</h2>
      <div className={css(styles.container)} data-testid='card-log'>
        <div className={css(styles.row)}>
          {cards.map((card, index) => (
            <AnimatePresence
              key={(card ? card.id + '_' + card.idx : '') + '_' + index}
            >
              {card && (
                <motion.div
                  initial={{ scale: Math.min(index, 1) }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className={css(
                    styles.imageWrapper({
                      isTurn: props.cardsThisTurn === index + 1 && index !== 5,
                    })
                  )}
                >
                  <Image
                    extend={styles.image}
                    src={card.image + '&w=45'}
                    alt={card.name}
                    onClick={() => setZoomedCard(card)}
                    data-testid='card-log-image'
                    width={45}
                    height={45}
                    lazy
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </>
  )
})
