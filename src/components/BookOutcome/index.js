import React from 'react'
import { Link } from 'react-router-dom'
import { BOOKS, EXPECTATIONS } from '../../constants/game'
import { CollectionContext } from '../CollectionProvider'
import Info from '../Info'
import Only from '../Only'
import { Coins, Stones } from '../Resource'
import getDrawingProbability from '../../helpers/getDrawingProbability'
import getAverageStonesPerBook from '../../helpers/getAverageStonesPerBook'
import getExpectedCoinsPerBook from '../../helpers/getExpectedCoinsPerBook'
import getRawCardData from '../../helpers/getRawCardData'
import getBookName from '../../helpers/getBookName'
import './index.css'

const useExpectedCoins = book => {
  const { hasDefaultCollection, collection } =
    React.useContext(CollectionContext)
  const collectionWithRarity = React.useMemo(
    () =>
      collection.map(card => {
        card.rarity = getRawCardData(card.id).rarity
        return card
      }),
    [collection]
  )

  const expectedCoins = hasDefaultCollection
    ? 0
    : getExpectedCoinsPerBook(collectionWithRarity, book)

  return expectedCoins
}

export default React.memo(function BookOutcome(props) {
  const bookName = getBookName(props.book)
  const expectedCoins = useExpectedCoins(props.book)
  const subject = props.isAdvancedMode
    ? 'at least one of the cards you want'
    : EXPECTATIONS[props.target].label.toLowerCase()
  const expectations = props.expectations.map(a => a || 0)
  const bookExpectations = EXPECTATIONS[props.target].getExpectations(
    BOOKS[props.book].only
  )
  const chances = getDrawingProbability(
    props.book,
    props.isAdvancedMode ? expectations : bookExpectations
  )

  return (
    <div className='BookOutcome'>
      <Info icon='books' title='Outcome'>
        {props.isAdvancedMode && expectations.join('') === '0000' ? (
          <p>
            Define how many different cards you need of each rarity to get the
            odds of drawing at least one of them in a {bookName} book.
          </p>
        ) : Number(chances) === 0 ? (
          <p>
            It is not possible to pull {subject} because this rarity does not
            appear in this type of book.
          </p>
        ) : (
          <>
            <p>
              Opening a <strong className='Highlight'>{bookName}</strong> would
              yield:
            </p>
            <ul>
              <li>
                <strong className='Highlight' data-testid='odds-result'>
                  {(chances * 100).toFixed(2)}%
                </strong>{' '}
                chances to draw {subject}
              </li>
              <li>
                An average of{' '}
                <strong className='Highlight' data-testid='average-stones'>
                  <Stones
                    amount={getAverageStonesPerBook(props.book).toFixed(2)}
                  />
                </strong>
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
                      <strong className='Highlight'>
                        <Coins amount={expectedCoins.toFixed(2)} />
                      </strong>
                    </>
                  ) : (
                    'No coins, because you cannot get copies for cards above level 5'
                  )}
                </li>
              </Only.CustomCollection>
            </ul>
          </>
        )}
      </Info>
    </div>
  )
})
