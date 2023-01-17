import React from 'react'
import { useFela } from 'react-fela'
import BlankButton from '#components/BlankButton'
import VersionedCard from '#components/VersionedCard'
import styles from './styles'

export default React.memo(function BattleSimCards(props) {
  const { css } = useFela()

  return (
    <>
      <div className={css(styles.cards)}>
        {[0, 1, 2, 3].map(index => {
          const item = props.cards[index] || {}

          return (
            <div
              className={css(styles.slot)}
              key={item.id || index}
              data-testid={`card-slot-${index}`}
            >
              {item.id ? (
                <BlankButton
                  data-testid='card-slot-button'
                  extend={styles.button}
                  onClick={() => props.zoom(item)}
                  label='Enlarge card'
                />
              ) : null}
              <div
                className={css(styles.slotContent)}
                data-testid='card-slot-content'
              >
                {item.id ? (
                  <VersionedCard
                    {...item}
                    currentMana={props.mana}
                    date={props.date}
                  />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
})
