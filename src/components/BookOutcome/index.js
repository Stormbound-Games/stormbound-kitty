import React from 'react'
import { useFela } from 'react-fela'
import Link from '#components/Link'
import { CardsContext } from '#components/CardsProvider'
import { CollectionContext } from '#components/CollectionProvider'
import Info from '#components/Info'
import Only from '#components/Only'
import { Coins, Stones } from '#components/Resource'
import getDrawingExpectations from '#helpers/getDrawingExpectations'
import getDrawingProbability from '#helpers/getDrawingProbability'
import getAverageStonesPerBook from '#helpers/getAverageStonesPerBook'
import getExpectedCoinsPerBook from '#helpers/getExpectedCoinsPerBook'

const useExpectedCoins = book => {
  const { cardsWithoutTokens, cardsIndex } = React.useContext(CardsContext)
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const collectionWithRarity = React.useMemo(
    () =>
      collection.map(card => {
        card.rarity = cardsIndex[card.id].rarity
        return card
      }),
    [collection, cardsIndex],
  )

  const expectedCoins = hasDefaultCollection
    ? 0
    : getExpectedCoinsPerBook(cardsWithoutTokens, collectionWithRarity, book)

  return expectedCoins
}

export default React.memo(function BookOutcome(props) {
  const { cardsWithoutTokens } = React.useContext(CardsContext)
  const { css } = useFela()
  const expectedCoins = useExpectedCoins(props.book)
  const subject = props.isAdvancedMode
    ? 'at least one of the cards you want'
    : getDrawingExpectations(props.target).label.toLowerCase()
  const expectations = props.expectations.map(a => a || 0)
  const bookExpectations = getDrawingExpectations(props.target).getExpectations(
    cardsWithoutTokens,
    props.book.only,
  )
  const chances =
    props.target === 'FUSION_STONES'
      ? props.book.fsOdds
      : getDrawingProbability(
          cardsWithoutTokens,
          props.book,
          props.isAdvancedMode ? expectations : bookExpectations,
        )

  return (
    <Info icon='books' title='Outcome'>
      {props.isAdvancedMode && expectations.join('') === '0000' ? (
        <p>
          Define how many different cards you need of each rarity to get the
          odds of drawing at least one of them in a {props.book.name}.
        </p>
      ) : Number(chances) === 0 ? (
        <p>
          It is not possible to pull {subject} because this rarity does not
          appear in this type of book.
        </p>
      ) : (
        <>
          <p>
            Opening a{' '}
            <span className='Highlight' data-testid='book-name'>
              {props.book.name}
            </span>{' '}
            would yield:
          </p>
          <ul
            className={css({
              paddingLeft: 'var(--s-smallest)',
              listStylePosition: 'inside',
            })}
          >
            <li>
              <span className='Highlight' data-testid='odds-result'>
                {(chances * 100).toFixed(2)}%
              </span>{' '}
              chance of drawing {subject}
            </li>
            <li>
              An average of{' '}
              <span className='Highlight' data-testid='average-stones'>
                <Stones
                  amount={getAverageStonesPerBook(props.book).toFixed(2)}
                />
              </span>
            </li>
            <Only.DefaultCollection>
              <li>
                Potentially some coins depending on{' '}
                <Link to='/collection'>your collection</Link>
              </li>
            </Only.DefaultCollection>
            <Only.CustomCollection>
              <li>
                {expectedCoins > 0 ? (
                  <>
                    An average of{' '}
                    <span className='Highlight'>
                      <Coins amount={expectedCoins.toFixed(2)} />
                    </span>
                  </>
                ) : (
                  'No coins, because your collection does not have cards level 5 yet'
                )}
              </li>
            </Only.CustomCollection>
          </ul>
        </>
      )}
    </Info>
  )
})
