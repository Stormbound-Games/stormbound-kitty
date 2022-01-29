import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import { BOOKS, EXPECTATIONS } from '~/constants/books'
import { CollectionContext } from '~/components/CollectionProvider'
import Info from '~/components/Info'
import Only from '~/components/Only'
import { Coins, Stones } from '~/components/Resource'
import getDrawingProbability from '~/helpers/getDrawingProbability'
import getAverageStonesPerBook from '~/helpers/getAverageStonesPerBook'
import getExpectedCoinsPerBook from '~/helpers/getExpectedCoinsPerBook'
import getRawCardData from '~/helpers/getRawCardData'
import getBookName from '~/helpers/getBookName'

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
  const { css } = useFela()
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
    <Info icon='books' title='Outcome'>
      {props.target === 'FUSION_STONES' && BOOKS[props.book].only ? (
        <p>
          It is not possible to compute the odds of pulling Fusion Stones in
          this kind of book.
        </p>
      ) : props.isAdvancedMode && expectations.join('') === '0000' ? (
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
          <ul
            className={css({
              paddingLeft: 'var(--s-smallest)',
              listStylePosition: 'inside',
            })}
          >
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
