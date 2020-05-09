import React from 'react'
import { BrawlContext } from '../BrawlProvider'
import Card from '../Card'
import Image from '../Image'
import BrawlProgressBar from '../BrawlProgressBar'
import ResourceIcon from '../ResourceIcon'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import './index.css'

const BrawlRewardLabel = React.memo(function BrawlRewardLabel(props) {
  const amount = props.rewardAmount

  switch (props.reward) {
    case 'HUMBLE_BOOK':
      return `${amount} Humble Book${amount === 1 ? '' : 's'}`
    case 'RUBIES':
      return `${amount} rub${amount === 1 ? 'y' : 'ies'}`
    case 'CLASSIC_TOME':
      return `${amount} Classic Tome${amount === 1 ? '' : 's'}`
    case 'FUSION_STONES':
      return `${amount} fusion stone${amount === 1 ? '' : 's'}`
    case 'MYTHIC_TOME':
      return `${amount} Mythic Tome${amount === 1 ? '' : 's'}`
    case 'LEGENDARY_CARD':
      return `${props.rewardAmount} legendary card${amount === 1 ? '' : 's'}`
    default:
      return null
  }
})

const BrawlRewardAsset = React.memo(function BrawlRewardAsset(props) {
  switch (props.reward) {
    case 'HUMBLE_BOOK':
      return <Image src='/assets/images/book-humble.png' alt='Humble book' />
    case 'RUBIES':
      return <Image src='/assets/images/RUBIES.png' alt='Rubies' />
    case 'CLASSIC_TOME':
      return <Image src='/assets/images/book-classic.png' alt='Classic tome' />
    case 'FUSION_STONES':
      return <Image src='/assets/images/stones.png' alt='Stones' />
    case 'MYTHIC_TOME':
      return <Image src='/assets/images/book-mythic.png' alt='Mythic tome' />
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
        <span className='BrawlMilestone__label'>
          <BrawlRewardLabel
            reward={props.reward}
            rewardAmount={props.rewardAmount}
          />
        </span>
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
