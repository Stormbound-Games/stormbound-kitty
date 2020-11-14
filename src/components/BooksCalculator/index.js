import React from 'react'
import { Link } from 'react-router-dom'
import { RARITIES, BOOKS, PRE_MADE_EXPECTATIONS } from '../../constants/game'
import BookExplanation from '../BookExplanation'
import BookOutcome from '../BookOutcome'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Image from '../Image'
import NumberInput from '../NumberInput'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import TogglableContent from '../TogglableContent'
import CardLink from '../CardLink'
import capitalise from '../../helpers/capitalise'
import countCardsForRarity from '../../helpers/countCardsForRarity'
import './index.css'

const clamp = (min, value, max) => Math.min(Math.max(Number(value), 0), max)

export default React.memo(function BooksCalculator(props) {
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false)
  const [book, setBook] = React.useState('MYTHIC')
  const [target, setTarget] = React.useState('FUSION_STONES')
  const [expectations, setExpectations] = React.useState([0, 0, 0, 0])

  // Reset the default state of each mode when toggling between the 2
  React.useEffect(() => {
    if (isAdvancedMode) setTarget('FUSION_STONES')
    else setExpectations([0, 0, 0, 0])
  }, [isAdvancedMode])

  const setExpectation = index => value =>
    setExpectations(expectations => [
      ...expectations.slice(0, index),
      clamp(
        0,
        Number(value),
        countCardsForRarity(Object.keys(RARITIES)[index])
      ),
      ...expectations.slice(index + 1),
    ])
  const setCommonExpectation = React.useCallback(() => setExpectation(0), [])
  const setRareExpectation = React.useCallback(() => setExpectation(1), [])
  const setEpicExpectation = React.useCallback(() => setExpectation(2), [])
  const setLegendaryExpectation = React.useCallback(() => setExpectation(3), [])

  return (
    <>
      <HeaderBanner title='Books Calculator' />

      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title element='h2'>What is this</Title>
          <p>
            This is a calculator to estimate the odds of getting fusion stones
            or a specific card when opening a certain book, as well as the
            average amount of coins based on your collection. Huge thanks to
            Neicigam (Neicigam#0095 on Discord) for helping with the math and
            the logic making this simulator possible.{' '}
            <Link to={{ pathname: '/faq', hash: '#books-calculator' }}>
              Learn more about how it works.
            </Link>
          </p>

          <form className='BooksCalculator__form'>
            <Row>
              <Column>
                <label htmlFor='book'>Book type</label>
                <select
                  id='book'
                  name='book'
                  value={book}
                  onChange={event => setBook(event.target.value)}
                  data-testid='book-select'
                >
                  {Object.keys(BOOKS).map(book => (
                    <option key={book} value={book}>
                      {capitalise(book.toLowerCase())}
                    </option>
                  ))}
                </select>
              </Column>

              <Column>
                <label htmlFor='target'>Looking for</label>
                <select
                  id='target'
                  name='target'
                  value={target}
                  onChange={event => setTarget(event.target.value)}
                  data-testid='target-select'
                  disabled={isAdvancedMode}
                >
                  {Object.keys(PRE_MADE_EXPECTATIONS).map(option => (
                    <option key={option} value={option}>
                      {PRE_MADE_EXPECTATIONS[option].label}
                    </option>
                  ))}
                </select>
              </Column>
            </Row>

            <TogglableContent
              isExpanded={isAdvancedMode}
              id='advanced-mode'
              renderToggle={toggleProps => (
                <button
                  {...toggleProps}
                  type='button'
                  className='ButtonAsLink BooksCalculator__toggle'
                  onClick={() => setIsAdvancedMode(mode => !mode)}
                >
                  {isAdvancedMode
                    ? '- Collapse advanced mode'
                    : '+ Expand advanced mode'}
                </button>
              )}
            >
              <p>
                Define how many different cards of any rarity you are looking
                for to know the odds of finding at least some of them when
                opening a {capitalise(book.toLowerCase())} book.
              </p>
              <p>
                For instance, if you’re looking for a copy of{' '}
                <CardLink id='N2' />, a copy of <CardLink id='I4' /> and a copy
                of <CardLink id='N8' />, set 2 for “Common cards” and 1 for
                “Legendary cards”.
              </p>
              <Row>
                <Column>
                  <label htmlFor='target-common'>Common cards</label>
                  <NumberInput
                    min={0}
                    max={countCardsForRarity('common')}
                    name='target-common'
                    id='target-common'
                    onChange={setCommonExpectation}
                    value={expectations[0]}
                  />
                </Column>
                <Column>
                  <label htmlFor='target-rare'>Rare cards</label>
                  <NumberInput
                    min={0}
                    max={countCardsForRarity('rare')}
                    name='target-rare'
                    id='target-rare'
                    onChange={setRareExpectation}
                    value={expectations[1]}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <label htmlFor='target-epic'>Epic cards</label>
                  <NumberInput
                    min={0}
                    max={countCardsForRarity('epic')}
                    name='target-epic'
                    id='target-epic'
                    onChange={setEpicExpectation}
                    value={expectations[2]}
                  />
                </Column>
                <Column>
                  <label htmlFor='target-legendary'>Legendary cards</label>
                  <NumberInput
                    min={0}
                    max={countCardsForRarity('legendary')}
                    name='target-legendary'
                    id='target-legendary'
                    onChange={setLegendaryExpectation}
                    value={expectations[3]}
                  />
                </Column>
              </Row>
            </TogglableContent>
          </form>
        </Column>

        <Column width='1/3'>
          <Title element='h2'>Outcome</Title>

          <BookExplanation book={book} />
          <BookOutcome
            book={book}
            target={target}
            isAdvancedMode={isAdvancedMode}
            expectations={expectations}
          />
        </Column>

        <Only.Desktop>
          <Column width='1/3'>
            <Image
              src={'/assets/images/books/book-' + book.toLowerCase() + '.png'}
              className='BooksCalculator__book'
              alt={capitalise(book.toLowerCase()) + ' book'}
              withAvif
            />
          </Column>
        </Only.Desktop>
      </Row>

      <PageMeta
        title='Books Calculator'
        description='Maximise the use of your resources and calculate the odds of finding a specific Stormbound card or fusion stones in a specific book'
      />
    </>
  )
})
