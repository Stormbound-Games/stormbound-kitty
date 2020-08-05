import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import { Coins, Stones } from '../Resource'
import getCollectionCost from '../../helpers/getCollectionCost'
import getExtraAfterMax from '../../helpers/getExtraAfterMax'
import getRawCardData from '../../helpers/getRawCardData'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import { getRarityColor } from '../../helpers/getRarity'
import cards from '../../data/cards'
import { RARITY_COPIES } from '../../constants/game'
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
    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    .filter(card => getRawCardData(card.id).id)
    .map(card => getExtraAfterMax(getResolvedCardData(card)).coins)
    .reduce(sum, 0)

const getCopiesData = (collection, expectedCardLevel) => {
  return Object.keys(RARITY_COPIES).map(rarity => {
    const copiesForCardLevel = RARITY_COPIES[rarity].copies
      .slice(0, expectedCardLevel - 1)
      .reduce((a, b) => a + b, 1)

    // Total amount of copies of this rarity needed to reach `cardLevel`
    const total = cards
      .filter(card => card.rarity === rarity)
      .reduce(
        (acc, card) =>
          acc +
          RARITY_COPIES[card.rarity].copies
            .slice(0, expectedCardLevel - 1)
            .reduce((a, b) => a + b, 1),
        0
      )

    // Total amount of copies of this rarity owned within `cardLevel`
    const current = collection
      .filter(card => getRawCardData(card.id).rarity === rarity)
      .reduce((acc, card) => {
        // If the card is missing from the collection entirely, it counts
        // as 0 copy of that rarity
        if (card.missing) return acc

        // If the card is at the expected card level or higher, it counts
        // as the amount of copies for a card of that rarity at that level
        if (card.level >= expectedCardLevel) return acc + copiesForCardLevel

        const levelCopies = RARITY_COPIES[rarity].copies.reduce(
          (acc, copies, index) => (card.level < index + 2 ? acc : acc + copies),
          1
        )

        return acc + Math.min(copiesForCardLevel, levelCopies + card.copies)
      }, 0)

    const missing = total - current
    const cost = missing * RARITY_COPIES[rarity].stonesPerMissingCopy

    return { rarity, current, total, missing, cost }
  })
}

export default function CollectionFigures(props) {
  const [expectedCardLevel, setExpectedCardLevel] = React.useState(5)
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
  const copiesData = React.useMemo(
    () => getCopiesData(props.collection, expectedCardLevel),
    [expectedCardLevel, props.collection]
  )

  return (
    <>
      <p>Find below some helpful metrics about your card collection:</p>
      <ul className='CollectionFigures__list'>
        <li>
          Total value
          <LearnMoreIcon anchor='#collection-value'>
            What is the collection value
          </LearnMoreIcon>
          :{' '}
          <span className='CollectionFigures__item'>
            <Stones amount={collectionCost} />
          </span>
        </li>
        <li>
          Average card level:{' '}
          <span className='CollectionFigures__item' title={levelStats.slice(1)}>
            {averageLevel.toFixed(2)}
          </span>
        </li>
        <li>
          Upgradable cards:{' '}
          <span className='CollectionFigures__item'>
            {upgradableCards.length}
          </span>
        </li>
        <li>
          Coins after exchange:{' '}
          <span className='CollectionFigures__item'>
            <Coins amount={extraAfterMax} />
          </span>
        </li>
        <li>
          Missing cards:{' '}
          <span className='CollectionFigures__item'>{missingCards.length}</span>
        </li>
      </ul>
      <p>
        To bring your entire collection to{' '}
        <select
          id='level'
          name='level'
          className='CollectionFigures__select'
          value={expectedCardLevel}
          onChange={event => setExpectedCardLevel(+event.target.value)}
        >
          <option value={2}>level 2</option>
          <option value={3}>level 3</option>
          <option value={4}>level 4</option>
          <option value={5}>level 5</option>
        </select>
        , you still need:
      </p>
      <ul className='CollectionFigures__list'>
        {copiesData.map(({ rarity, total, current, missing, cost }) => {
          if (current >= total) {
            return <li key={rarity}>No more {rarity} copies</li>
          }

          return (
            <li key={rarity}>
              {missing}{' '}
              <span style={{ color: getRarityColor(rarity) }}>{rarity}</span>{' '}
              {missing === 1 ? 'copy' : 'copies'} out of {total} (
              {((current / total) * 100).toFixed(2)}% completed) <br />
              or <Stones amount={cost} />
            </li>
          )
        })}
      </ul>

      <Info title='Books & Income Calculators' style={{ marginTop: '2em' }}>
        To figure out the odds of finding a specific card in a certain book, be
        sure to check the <Link to='/collection/books'>books calculator</Link>.
        To learn more about your regular resources and cards income, use the{' '}
        <Link to='/income-calculator'>income calculator</Link>.
      </Info>
    </>
  )
}
