import React from 'react'
import Link from '~/components/Link'
import { RARITIES } from '~/constants/game'
import { CardsContext } from '~/components/CardsProvider'
import Info from '~/components/Info'
import Label from '~/components/Label'
import Page from '~/components/Page'
import BookExplanation from '~/components/BookExplanation'
import BookOutcome from '~/components/BookOutcome'
import Table from '~/components/Table'
import NumberInput from '~/components/NumberInput'
import Only from '~/components/Only'
import Row from '~/components/Row'
import Select from '~/components/Select'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import countCards from '~/helpers/countCards'
import getResourceLabel from '~/helpers/getResourceLabel'
import getDrawingExpectations from '~/helpers/getDrawingExpectations'
import indexArray from '~/helpers/indexArray'
import styles from './styles'

const clamp = (min, value, max) => Math.min(Math.max(Number(value), min), max)

export default React.memo(function BooksCalculator(props) {
  const { cards } = React.useContext(CardsContext)
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false)
  const [bookId, setBookId] = React.useState(props.books[0].id)
  const [target, setTarget] = React.useState('FUSION_STONES')
  const [expectations, setExpectations] = React.useState([0, 0, 0, 0])
  const booksIndex = indexArray(props.books)

  // Reset the default state of each mode when toggling between the 2
  React.useEffect(() => {
    if (isAdvancedMode) setTarget('FUSION_STONES')
    else setExpectations([0, 0, 0, 0])
  }, [isAdvancedMode])

  const setExpectation = (index, value) => {
    setExpectations(expectations => [
      ...expectations.slice(0, index),
      value === ''
        ? ''
        : clamp(
            0,
            Number(value),
            countCards(cards, { rarity: Object.keys(RARITIES)[index] })
          ),
      ...expectations.slice(index + 1),
    ])
  }

  const setCommonExpectation = React.useCallback(
    value => setExpectation(0, value),
    // eslint-disable-next-line
    []
  )
  const setRareExpectation = React.useCallback(
    value => setExpectation(1, value),
    // eslint-disable-next-line
    []
  )
  const setEpicExpectation = React.useCallback(
    value => setExpectation(2, value),
    // eslint-disable-next-line
    []
  )
  const setLegendaryExpectation = React.useCallback(
    value => setExpectation(3, value),
    // eslint-disable-next-line
    []
  )

  return (
    <Page
      title='Books Calculator'
      description='Maximize the use of your resources and calculate the odds of finding a specific Stormbound card or fusion stones in a specific book'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a calculator to estimate the odds of getting fusion stones
            or a specific card when opening a certain book, as well as the
            average amount of coins based on your collection.
          </p>

          <Info
            icon='warning'
            title='Important disclaimer'
            spacing={{ vertical: 'SMALL' }}
          >
            <p>
              This is only an approximate simulation based on available
              information. This is in no way a guarantee, and any suggested
              outcome shared by the calculator should be taken with a grain of
              salt.{' '}
              <Link to={{ pathname: '/faq', hash: '#books-calculator' }}>
                Learn more about how it works.
              </Link>
            </p>
          </Info>

          <Spacing top='BASE' bottom='LARGER'>
            <form>
              <Row withNarrowGutter>
                <Row.Column>
                  <Select
                    label='Book type'
                    id='book'
                    value={bookId}
                    onChange={event => setBookId(event.target.value)}
                    data-testid='book-select'
                  >
                    {props.books.map(book => (
                      <option key={book._id} value={book.id}>
                        {book.name}
                      </option>
                    ))}
                  </Select>
                </Row.Column>

                <Row.Column>
                  <Select
                    label='Looking for'
                    id='target'
                    value={target}
                    onChange={event => setTarget(event.target.value)}
                    data-testid='target-select'
                    disabled={isAdvancedMode}
                  >
                    <option value='FUSION_STONES'>Fusion stones</option>
                    {Object.keys(RARITIES)
                      .map(rarity => rarity.toUpperCase())
                      .flatMap(rarity => [
                        'SPECIFIC_' + rarity,
                        'ANY_' + rarity,
                      ])
                      .map(type => (
                        <option key={type} value={type}>
                          {getDrawingExpectations(type).label}
                        </option>
                      ))}
                  </Select>
                </Row.Column>
              </Row>

              <Label
                as='button'
                id='advanced-mode-toggle'
                aria-controls='advanced-mode'
                aria-expanded={isAdvancedMode}
                type='button'
                onClick={() => setIsAdvancedMode(m => !m)}
                extend={styles.toggle}
              >
                + Advanced mode
              </Label>
              <div
                id='advanced-mode'
                hidden={!isAdvancedMode}
                aria-labelledby='advanced-mode-toggle'
              >
                <p>
                  Define how many different cards of any rarity you are looking
                  for to know the odds of finding at least some of them when
                  opening a {booksIndex[bookId].name}.
                </p>
                <p>
                  For instance, if you’re looking for a copy of Summon Militia,
                  a copy of Ozone Purifiers and a copy of Collector Mirz, set 2
                  for “Common cards” and 1 for “Legendary cards”.
                </p>
                <Row withNarrowGutter>
                  <Row.Column>
                    <NumberInput
                      label='Common cards'
                      min={0}
                      max={countCards(cards, { rarity: 'common' })}
                      name='target-common'
                      id='target-common'
                      onChange={setCommonExpectation}
                      value={expectations[0]}
                    />
                  </Row.Column>
                  <Row.Column>
                    <NumberInput
                      label='Rare cards'
                      min={0}
                      max={countCards(cards, { rarity: 'rare' })}
                      name='target-rare'
                      id='target-rare'
                      onChange={setRareExpectation}
                      value={expectations[1]}
                    />
                  </Row.Column>
                </Row>
                <Row withNarrowGutter>
                  <Row.Column>
                    <NumberInput
                      label='Epic cards'
                      min={0}
                      max={countCards(cards, { rarity: 'epic' })}
                      name='target-epic'
                      id='target-epic'
                      onChange={setEpicExpectation}
                      value={expectations[2]}
                    />
                  </Row.Column>
                  <Row.Column>
                    <NumberInput
                      label='Legendary cards'
                      min={0}
                      max={countCards(cards, { rarity: 'legendary' })}
                      name='target-legendary'
                      id='target-legendary'
                      onChange={setLegendaryExpectation}
                      value={expectations[3]}
                    />
                  </Row.Column>
                </Row>
              </div>
            </form>
          </Spacing>
        </Row.Column>

        <Row.Column width='1/3'>
          <Title element='h2'>Outcome</Title>

          <BookExplanation book={booksIndex[bookId]} />
          <BookOutcome
            book={booksIndex[bookId]}
            target={target}
            isAdvancedMode={isAdvancedMode}
            expectations={expectations}
          />
        </Row.Column>

        <Only.Desktop>
          <Row.Column width='1/3'>
            <Title>Book costs</Title>
            <Table zebra>
              <thead>
                <tr>
                  <th>Book name</th>
                  <th>Book cost</th>
                </tr>
              </thead>
              <tbody>
                {props.books
                  .filter(book => book.cost)
                  .map(book => (
                    <tr key={book._id}>
                      <td data-label='Book name'>
                        <Link onClick={() => setBookId(book.id)}>
                          {book.name}
                        </Link>
                      </td>
                      <td data-label='Book cost'>
                        {getResourceLabel(book.cost, true)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Row.Column>
        </Only.Desktop>
      </Row>
    </Page>
  )
})
