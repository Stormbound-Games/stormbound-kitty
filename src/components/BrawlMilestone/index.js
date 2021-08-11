import React from 'react'
import { useFela } from 'react-fela'
import { BrawlContext } from '../BrawlProvider'
import Card from '../Card'
import Image from '../Image'
import BrawlProgressBar from '../BrawlProgressBar'
import ResourceIcon from '../ResourceIcon'
import capitalise from '../../helpers/capitalise'
import getRewardLabel from '../../helpers/getRewardLabel'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import styles from './styles'

const BrawlRewardAsset = React.memo(function BrawlRewardAsset(props) {
  switch (props.reward) {
    case 'MYTHIC_BOOK':
    case 'HEROIC_BOOK':
    case 'HUMBLE_BOOK':
    case 'CLASSIC_BOOK':
    case 'NOBLE_BOOK': {
      const bookType = props.reward.replace('_BOOK', '').toLowerCase()
      return (
        <Image
          src={`/assets/images/books/book-${bookType}.png`}
          alt={`${capitalise(bookType)} book`}
          extend={styles.bookImage}
          withAvif
        />
      )
    }
    case 'COINS':
      return (
        <Image
          src='/assets/images/iconography/coins.png'
          alt='Coins'
          extend={styles.resourceImage}
        />
      )

    case 'RUBIES':
      return (
        <Image
          src='/assets/images/iconography/rubies.png'
          alt='Rubies'
          extend={styles.resourceImage}
        />
      )

    case 'FUSION_STONES':
      return (
        <Image
          src='/assets/images/cards/stones_rare.png'
          alt='Stones'
          extend={styles.resourceImage}
        />
      )

    case 'LEGENDARY_CARD':
      return (
        <Card
          {...getResolvedCardData({ id: props.cardId })}
          level={1}
          extend={styles.card}
        />
      )
    default:
      return null
  }
})

export default React.memo(function BrawlMilestone(props) {
  const { meta } = React.useContext(BrawlContext)
  const collected = meta.crowns >= props.crowns
  const { css } = useFela({ isCollected: collected })

  return (
    <div
      data-testid='milestone'
      className={css(styles.milestone)}
      data-collected={collected || undefined}
    >
      <header className={css(styles.header)}>Milestone {props.index}</header>

      {collected && (
        <div className={css(styles.overlay)}>
          <span className={css(styles.collected)}>Collected</span>
        </div>
      )}

      <div className={css(styles.body)}>
        <div className={css({ width: '50%' })}>
          <BrawlRewardAsset reward={props.reward} cardId={props.cardId} />
        </div>
        <span className={css(styles.label)}>{getRewardLabel(props)}</span>
      </div>

      <div className={css(styles.footer)}>
        <BrawlProgressBar
          value={meta.crowns}
          max={props.crowns}
          label={
            <>
              {meta.crowns}/{props.crowns} <ResourceIcon resource='CROWN' />
            </>
          }
        />
      </div>
    </div>
  )
})
