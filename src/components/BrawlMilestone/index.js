import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import Card from '../Card'
import Image from '../Image'
import BrawlProgressBar from '../BrawlProgressBar'
import ResourceIcon from '../ResourceIcon'
import capitalise from '../../helpers/capitalise'
import getRewardLabel from '../../helpers/getRewardLabel'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import './index.css'

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
          withAvif
        />
      )
    }
    case 'COINS':
      return <Image src='/assets/images/iconography/coins.png' alt='Coins' />

    case 'RUBIES':
      return <Image src='/assets/images/iconography/rubies.png' alt='Rubies' />

    case 'FUSION_STONES':
      return <Image src='/assets/images/iconography/stones.png' alt='Stones' />

    case 'LEGENDARY_CARD':
      return <Card {...getResolvedCardData({ id: props.cardId })} level={1} />
    default:
      return null
  }
})

export default React.memo(function BrawlMilestone(props) {
  const { meta } = React.useContext(BrawlContext)
  const collected = meta.crowns >= props.crowns

  return (
    <div
      data-testid='milestone'
      className={['BrawlMilestone', collected && 'BrawlMilestone--collected']
        .filter(Boolean)
        .join(' ')}
    >
      <header className='BrawlMilestone__header'>
        Milestone {props.index}
      </header>

      {collected && (
        <div className='BrawlMilestone__overlay'>
          <span className='BrawlMilestone__collected'>Collected</span>
        </div>
      )}

      <div className='BrawlMilestone__body'>
        <div
          className={[
            'BrawlMilestone__asset',
            `BrawlMilestone__asset--${props.reward}`,
          ].join(' ')}
        >
          <BrawlRewardAsset reward={props.reward} cardId={props.cardId} />
        </div>
        <span className='BrawlMilestone__label'>{getRewardLabel(props)}</span>
      </div>

      <div className='BrawlMilestone__footer'>
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
