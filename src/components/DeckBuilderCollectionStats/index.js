import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title'
import getCollectionCost from '../../helpers/getCollectionCost'
import getExtraAfterMax from '../../helpers/getExtraAfterMax'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

const sum = (a, b) => a + b
const getAverageLevel = cards =>
  cards.map(card => card.level).reduce(sum, 0) / cards.length
const getUpgradableCards = cards => cards.filter(isCardUpgradable)
const getMissingCards = cards =>
  cards.filter(card => card.missing && !card.token)
const getNonMissingCards = cards =>
  cards.filter(card => !card.missing && !card.token)
const getLevelStats = (cards, totalKnownCards) =>
  cards
    .reduce(
      (acc, card) => {
        acc[card.level - 1]++
        return acc
      },
      [0, 0, 0, 0, 0]
    )
    .map(amount => (amount / totalKnownCards) * 100)
    .reduce(
      (acc, value, i) =>
        `${acc}${i === 0 ? '' : ', '} ${Math.round(value)}% level ${i + 1}`,
      ''
    )

const getAvailableCoins = collection =>
  collection
    .map(card => getExtraAfterMax(resolveCardForLevel(card)).coins)
    .reduce(sum, 0)

const DeckBuilderCollectionStats = props => {
  const ownedCards = React.useMemo(() => getNonMissingCards(props.collection), [
    props.collection,
  ])
  const averageLevel = React.useMemo(() => getAverageLevel(ownedCards), [
    ownedCards,
  ])
  const upgradableCards = React.useMemo(
    () => getUpgradableCards(props.collection),
    [props.collection]
  )
  const missingCards = React.useMemo(() => getMissingCards(props.collection), [
    props.collection,
  ])
  const levelStats = React.useMemo(
    () =>
      getLevelStats(
        props.collection,
        props.collection.length - missingCards.length
      ),
    [missingCards.length, props.collection]
  )

  const extraAfterMax = React.useMemo(
    () => getAvailableCoins(props.collection),
    [props.collection]
  )
  const collectionCost = React.useMemo(
    () => getCollectionCost(props.collection),
    [props.collection]
  )

  return (
    <>
      <Title>Collection stats</Title>
      <p className='DeckBuilderCollectionStats__intro'>
        Find below some helperful metrics about your card collection:
      </p>
      <ul className='DeckBuilderCollectionStats__list'>
        <li>
          Total value:{' '}
          <span className='DeckBuilderCollectionStats__item'>
            {collectionCost}
          </span>{' '}
          stones
        </li>
        <li>
          Average card level:{' '}
          <span
            className='DeckBuilderCollectionStats__item'
            title={levelStats.slice(1)}
          >
            {averageLevel.toFixed(2)}
          </span>
        </li>
        <li>
          Upgradable cards:{' '}
          <span className='DeckBuilderCollectionStats__item'>
            {upgradableCards.length}
          </span>
        </li>
        <li>
          Coins after exchange:{' '}
          <span className='DeckBuilderCollectionStats__item'>
            {extraAfterMax}
          </span>
        </li>
        <li>
          Missing cards:{' '}
          <span className='DeckBuilderCollectionStats__item'>
            {missingCards.length}
          </span>
        </li>
      </ul>
      <p>
        To know about the odds of finding a specific card in a certain book, be
        sure to check the <Link to='/books'>books calculator</Link>.
      </p>
    </>
  )
}

export default DeckBuilderCollectionStats
