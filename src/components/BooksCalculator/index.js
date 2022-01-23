import React from 'react'
import Link from '~/components/Link'
import { RARITIES } from '~/constants/game'
import { BOOKS, EXPECTATIONS } from '~/constants/books'
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
import CardLink from '~/components/CardLink'
import countCards from '~/helpers/countCards'
import getResourceLabel from '~/helpers/getResourceLabel'
import getBookName from '~/helpers/getBookName'
import styles from './styles'

const clamp = (min, value, max) => Math.min(Math.max(Number(value), 0), max)

export default React.memo(function BooksCalculator(props) {
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false)
  const [bookType, setBookType] = React.useState('MYTHIC')
  const [target, setTarget] = React.useState('FUSION_STONES')
  const [expectations, setExpectations] = React.useState([0, 0, 0, 0])

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
            countCards({ rarity: Object.keys(RARITIES)[index] })
          ),
      ...expectations.slice(index + 1),
    ])
  }

  const setCommonExpectation = React.useCallback(
    value => setExpectation(0, value),
    []
  )
  const setRareExpectation = React.useCallback(
    value => setExpectation(1, value),
    []
  )
  const setEpicExpectation = React.useCallback(
    value => setExpectation(2, value),
    []
  )
  const setLegendaryExpectation = React.useCallback(
    value => setExpectation(3, value),
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
            average amount of coins based on your collection.{' '}
            <Link to={{ pathname: '/faq', hash: '#books-calculator' }}>
              Learn more about how it works.
            </Link>
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
              salt.
            </p>
          </Info>

          <Spacing top='BASE' bottom='LARGER'>
            <form>
              <Row withNarrowGutter>
                <Row.Column>
                  <Select
                    label='Book type'
                    id='book'
                    value={bookType}
                    onChange={event => setBookType(event.target.value)}
                    data-testid='book-select'
                  >
                    {Object.keys(BOOKS).map(bookType => (
                      <option key={bookType} value={bookType}>
                        {getBookName(bookType)}
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
                    {Object.keys(EXPECTATIONS).map(option => (
                      <option key={option} value={option}>
                        {EXPECTATIONS[option].label}
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
                  opening a {getBookName(bookType)}.
                </p>
                <p>
                  For instance, if you’re looking for a copy of{' '}
                  <CardLink id='N2' />, a copy of <CardLink id='I4' /> and a
                  copy of <CardLink id='N8' />, set 2 for “Common cards” and 1
                  for “Legendary cards”.
                </p>
                <Row withNarrowGutter>
                  <Row.Column>
                    <NumberInput
                      label='Common cards'
                      min={0}
                      max={countCards({ rarity: 'common' })}
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
                      max={countCards({ rarity: 'rare' })}
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
                      max={countCards({ rarity: 'epic' })}
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
                      max={countCards({ rarity: 'legendary' })}
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

          <BookExplanation book={bookType} />
          <BookOutcome
            book={bookType}
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
                {Object.keys(BOOKS)
                  .filter(book => BOOKS[book].cost)
                  .map(book => (
                    <tr key={book}>
                      <td data-label='Book name'>
                        <Link onClick={() => setBookType(book)}>
                          {getBookName(book)}
                        </Link>
                      </td>
                      <td data-label='Book cost'>
                        {getResourceLabel(BOOKS[book].cost, true)}
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
