import React from 'react'
import { Link } from 'react-router-dom'
import { PRE_MADE_EXPECTATIONS } from '../../constants/game'
import { CollectionContext } from '../CollectionProvider'
import getDrawingProbability from '../../helpers/getDrawingProbability'
import capitalise from '../../helpers/capitalise'
import getAverageStonesPerBook from '../../helpers/getAverageStonesPerBook'
import getExpectedCoinsPerBook from '../../helpers/getExpectedCoinsPerBook'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

const useExpectedCoins = book => {
  const { hasDefaultCollection, collection } = React.useContext(
    CollectionContext
  )
  const collectionWithRarity = React.useMemo(
    () =>
      collection.map(card => {
        card.rarity = resolveCardForLevel(card).rarity
        return card
      }),
    [collection]
  )

  const expectedCoins = hasDefaultCollection
    ? 0
    : getExpectedCoinsPerBook(collectionWithRarity, book)

  return expectedCoins
}

const BookOutcome = props => {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const bookName = capitalise(props.book.toLowerCase())
  const expectedCoins = useExpectedCoins(props.book)
  const subject = props.isAdvancedMode
    ? 'at least one of the cards you want'
    : PRE_MADE_EXPECTATIONS[props.target].label.toLowerCase()
  const chances = getDrawingProbability(
    props.book,
    props.isAdvancedMode
      ? props.expectations
      : PRE_MADE_EXPECTATIONS[props.target].expectations
  )

  if (props.isAdvancedMode && props.expectations.join('') === '0000') {
    return (
      <p>
        Define how many different cards you need of each rarity to get the odds
        of drawing at least one of them in a {bookName}.
      </p>
    )
  }

  if (Number(chances) === 0) {
    return (
      <p>
        It is not possible to pull {subject} because this rarity does not appear
        in this type of book.
      </p>
    )
  }

  return (
    <div className='BookOutcome'>
      <p>
        Opening a <strong className='Highlight'>{bookName} book</strong> would
        yield:
      </p>
      <ul>
        <li>
          <strong className='Highlight'>{(chances * 100).toFixed(2)}%</strong>{' '}
          chances to draw {subject}
        </li>
        <li>
          An average of{' '}
          <strong className='Highlight'>
            {getAverageStonesPerBook(props.book).toFixed(2)} Fusion stones
          </strong>
        </li>
        {hasDefaultCollection ? (
          <li>
            Potentially some coins depending on{' '}
            <Link to='/collection'>your collection</Link>
          </li>
        ) : (
          <li>
            {expectedCoins > 0 ? (
              <>
                An average of{' '}
                <strong className='Highlight'>
                  {expectedCoins.toFixed(2)} coins
                </strong>
              </>
            ) : (
              'No coins, because you cannot get copies for cards above level 5'
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default BookOutcome
