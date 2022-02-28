import React from 'react'
import { useFela } from 'react-fela'
import { CardsContext } from '~/components/CardsProvider'
import { CollectionContext } from '~/components/CollectionProvider'
import Link from '~/components/Link'
import Info from '~/components/Info'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Select from '~/components/Select'
import { Coins, Stones } from '~/components/Resource'
import countCards from '~/helpers/countCards'
import getCollectionCost from '~/helpers/getCollectionCost'
import getExtraAfterMax from '~/helpers/getExtraAfterMax'
import isCardUpgradable from '~/helpers/isCardUpgradable'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import getBaseHealth from '~/helpers/getBaseHealth'
import isLevelAvailable from '~/helpers/isLevelAvailable'
import { RARITY_COPIES, UPGRADE_COST } from '~/constants/game'
import styles from './styles'

const sum = (a, b) => a + b
const getAverageLevel = cards =>
  cards.map(card => card.level).reduce(sum, 0) / cards.length
const getUpgradableCards = (cardsIndex, cards) =>
  cards.filter(card => isCardUpgradable(cardsIndex, card))
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

const useAvailableCoins = () => {
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)

  return (
    collection
      // It is technically possible for the card not to be found in the
      // collection at all if it was added as a new card in a separate branch,
      // stored in local storage. Then, checking out a branch without this card
      // in the database yet would cause the card not to be found in the
      // collection. It cannot happen in production unless cards ever get
      // removed from the game.
      .filter(card => cardsIndex[card.id].id)
      .map(
        card => getExtraAfterMax(getResolvedCardData(cardsIndex, card)).coins
      )
      .reduce(sum, 0)
  )
}

const useCopiesData = expectedCardLevel => {
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)

  return Object.keys(RARITY_COPIES).map(rarity => {
    const copiesForCardLevel = RARITY_COPIES[rarity].copies
      .slice(0, expectedCardLevel - 1)
      .reduce((a, b) => a + b, 1)

    const cardsFromRarity = collection.filter(
      card => cardsIndex[card.id].rarity === rarity
    )

    // Total amount of copies of this rarity needed to reach `cardLevel`
    const total =
      countCards(cards, { rarity }, false) *
      RARITY_COPIES[rarity].copies
        .slice(0, expectedCardLevel - 1)
        .reduce((a, b) => a + b, 1)

    const coins = cardsFromRarity.reduce((total, card) => {
      if (card.missing || card.level >= expectedCardLevel) return total

      const upgradeCost = UPGRADE_COST.slice(
        card.level - 1,
        expectedCardLevel - 1
      ).reduce((a, b) => a + b, 0)

      return total + upgradeCost
    }, 0)

    // Total amount of copies of this rarity owned within `cardLevel`
    const current = cardsFromRarity.reduce((acc, card) => {
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

    return { rarity, current, total, missing, cost, coins }
  })
}

const getFortressAfterUpgrade = (collection, cardsIndex) => {
  const updateCard = card => {
    if (!isCardUpgradable(cardsIndex, card)) return card

    return {
      ...card,
      level: [5, 4, 3, 2].find(level =>
        isLevelAvailable(cardsIndex, card, level)
      ),
    }
  }

  return getBaseHealth(collection.map(updateCard), cardsIndex)
}

const useFortressDisplay = () => {
  const { collection } = React.useContext(CollectionContext)
  const { cardsIndex } = React.useContext(CardsContext)
  const curr = getBaseHealth(collection, cardsIndex)
  const next = getFortressAfterUpgrade(collection, cardsIndex)

  // If done with the fortress (level 20, progress 100%), simply return the
  // fortress level
  if (curr.progress === 1) return curr.level

  // Small function to display a progress with rounding (and visually showing
  // approximation)
  const display = progress => '~' + Math.round(progress * 100) + '%'

  // Current fortress display (level + progress)
  const current = `${curr.level} and ${display(curr.progress)}`

  // If the progress after upgrade is the same as now, it means upgrading cards
  // will make no difference (or there are no cards to upgrade), therefore it
  // can return the current fortress display
  if (next.progress === curr.progress) return current

  const willLevelUp = next.level > curr.level
  const willNotBeDone = next.progress < 1

  // If there is progress upon upgrading cards, display it like so:
  // e.g. “13 and ~14% (~34% after upgrading)”
  // e.g. “13 and ~14% (15 and ~2% after upgrading)”
  return [
    // Current level and progress
    `${current} (`,
    // If the level is different after upgrade, show it
    willLevelUp && next.level,
    // If the next progress is not 100%, add connector
    willLevelUp && willNotBeDone && ' and ',
    // Display next progress
    willNotBeDone && display(next.progress),
    ' after upgrading)',
  ]
    .filter(Boolean)
    .join('')
}

export default React.memo(function CollectionFigures(props) {
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)
  const { css } = useFela()
  const [expectedCardLevel, setExpectedCardLevel] = React.useState(5)
  const ownedCards = React.useMemo(
    () => getNonMissingCards(collection),
    [collection]
  )
  const averageLevel = React.useMemo(
    () => getAverageLevel(ownedCards),
    [ownedCards]
  )
  const upgradableCards = React.useMemo(
    () => getUpgradableCards(cardsIndex, collection),
    [cardsIndex, collection]
  )
  const missingCards = React.useMemo(
    () => getMissingCards(collection),
    [collection]
  )
  const levelStats = React.useMemo(
    () => getLevelStats(collection, collection.length - missingCards.length),
    [missingCards.length, collection]
  )

  const extraAfterMax = useAvailableCoins()

  const collectionCost = React.useMemo(
    () => getCollectionCost(cardsIndex, collection),
    [cardsIndex, collection]
  )
  const copiesData = useCopiesData(expectedCardLevel)
  const fortressDisplay = useFortressDisplay()

  return (
    <>
      <p>Find below some helpful metrics about your card collection:</p>
      <ul className={css(styles.list)}>
        <li>
          Total value
          <LearnMoreIcon anchor='#collection-value'>
            What is the collection value
          </LearnMoreIcon>
          :{' '}
          <span className={css(styles.item)}>
            <Stones amount={collectionCost} />
          </span>{' '}
          ({((collectionCost / props.maxCollectionCost) * 100).toFixed(2)}%)
        </li>
        <li>
          Average card level:{' '}
          <span className={css(styles.item)} title={levelStats.slice(1)}>
            {averageLevel.toFixed(2)}
          </span>
        </li>
        <li>
          Upgradable cards:{' '}
          <span className={css(styles.item)}>{upgradableCards.length}</span>
        </li>
        <li>
          Coins after exchange:{' '}
          <span className={css(styles.item)}>
            <Coins amount={extraAfterMax} />
          </span>
        </li>
        <li>
          Missing cards:{' '}
          <span className={css(styles.item)}>{missingCards.length}</span>
        </li>
        <li>
          Fortress level:{' '}
          <span className={css(styles.item)}>{fortressDisplay}</span>
        </li>
      </ul>
      <p>
        To bring your entire collection to{' '}
        <Select
          hideLabel
          label='Level'
          id='level'
          extend={styles.select}
          value={expectedCardLevel}
          onChange={event => setExpectedCardLevel(+event.target.value)}
        >
          <option value={2}>level 2</option>
          <option value={3}>level 3</option>
          <option value={4}>level 4</option>
          <option value={5}>level 5</option>
        </Select>
        , you still need:
      </p>
      <ul className={css(styles.list)}>
        {copiesData.map(({ rarity, total, current, missing, cost, coins }) => {
          if (current >= total) {
            return <li key={rarity}>No more {rarity} copies</li>
          }

          return (
            <li key={rarity}>
              {missing}{' '}
              <span className={css({ color: `var(--${rarity})` })}>
                {rarity}
              </span>{' '}
              {missing === 1 ? 'copy' : 'copies'} out of {total} (
              {((current / total) * 100).toFixed(2)}% completed) or{' '}
              <Stones amount={cost} />
              {coins > 0 ? (
                <>
                  , and <Coins amount={coins} /> for the upgrades
                </>
              ) : null}
            </li>
          )
        })}
      </ul>

      <Info icon='equalizer' title='Books & Income Calculators'>
        <p>
          To figure out the odds of finding a specific card in a certain book,
          be sure to check the{' '}
          <Link to='/calculators/books'>books calculator</Link>. To learn more
          about your regular resources and cards income, use the{' '}
          <Link to='/calculators/income'>income calculator</Link>.
        </p>
      </Info>
    </>
  )
})
