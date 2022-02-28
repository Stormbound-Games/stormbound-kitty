import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import { BrawlContext } from '~/components/BrawlProvider'
import Card from '~/components/Card'
import Image from '~/components/Image'
import BrawlProgressBar from '~/components/BrawlProgressBar'
import ResourceIcon from '~/components/ResourceIcon'
import capitalize from '~/helpers/capitalize'
import getResourceLabel from '~/helpers/getResourceLabel'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import { BOOKS } from '~/constants/books'
import styles from './styles'

const BrawlRewardAsset = React.memo(function BrawlRewardAsset(props) {
  const { cardsIndex } = React.useContext(CardsContext)

  switch (props.reward) {
    case 'MYTHIC_BOOK':
    case 'HEROIC_BOOK':
    case 'HUMBLE_BOOK':
    case 'CLASSIC_BOOK':
    case 'NOBLE_BOOK': {
      const bookType = props.reward.replace('_BOOK', '')
      const book = BOOKS[bookType]

      return (
        <Image
          src={book.image}
          alt={`${capitalize(bookType.toLowerCase())} book`}
          extend={styles.bookImage}
          width={150}
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
          {...getResolvedCardData(cardsIndex, { id: props.cardId })}
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
        <span className={css(styles.label)}>{getResourceLabel(props)}</span>
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
