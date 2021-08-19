import React from 'react'
import { useFela } from 'react-fela'
import getRarityColor from '~/helpers/getRarityColor'
import styles from './styles'

export default React.memo(function RarityBar(props) {
  const { css } = useFela()
  const getRarityCount = rarity =>
    props.deck.filter(card => card.rarity === rarity).length
  const commons = getRarityCount('common')
  const rares = getRarityCount('rare')
  const epics = getRarityCount('epic')
  const legendaries = getRarityCount('legendary')

  return (
    <div className={css(styles.bar)} aria-hidden>
      {commons > 0 && (
        <div
          className={css(styles.slice)}
          style={{
            '--color': getRarityColor('common', 'bright'),
            '--count': commons,
          }}
        >
          <span className={css(styles.count)} title={commons}>
            {commons}
          </span>
        </div>
      )}
      {rares > 0 && (
        <div
          className={css(styles.slice)}
          style={{
            '--color': getRarityColor('rare', 'bright'),
            '--count': rares,
          }}
        >
          <span className={css(styles.count)} title={rares}>
            {rares}
          </span>
        </div>
      )}
      {epics > 0 && (
        <div
          className={css(styles.slice)}
          style={{
            '--color': getRarityColor('epic', 'bright'),
            '--count': epics,
          }}
        >
          <span className={css(styles.count)} title={epics}>
            {epics}
          </span>
        </div>
      )}
      {legendaries > 0 && (
        <div
          className={css(styles.slice)}
          style={{
            '--color': getRarityColor('legendary', 'bright'),
            '--count': legendaries,
          }}
        >
          <span className={css(styles.count)} title={legendaries}>
            {legendaries}
          </span>
        </div>
      )}
    </div>
  )
})
