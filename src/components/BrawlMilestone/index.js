import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import Card from '../Card'
import Image from '../Image'
import BrawlProgressBar from '../BrawlProgressBar'
import ResourceIcon from '../ResourceIcon'
import getRewardLabel from '../../helpers/getRewardLabel'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import './index.css'

const BrawlRewardAsset = React.memo(function BrawlRewardAsset(props) {
  switch (props.reward) {
    case 'HUMBLE_BOOK':
      return (
        <Image
          src='/assets/images/books/book-humble.png'
          alt='Humble book'
          withAvif
        />
      )
    case 'RUBIES':
      return <Image src='/assets/images/iconography/rubies.png' alt='Rubies' />
    case 'CLASSIC_BOOK':
      return (
        <Image
          src='/assets/images/books/book-classic.png'
          alt='Classic book'
          withAvif
        />
      )
    case 'FUSION_STONES':
      return <Image src='/assets/images/iconography/stones.png' alt='Stones' />
    case 'MYTHIC_BOOK':
      return (
        <Image
          src='/assets/images/books/book-mythic.png'
          alt='Mythic book'
          withAvif
        />
      )
    case 'LEGENDARY_CARD':
      return <Card {...getResolvedCardData({ id: props.cardId })} />
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
