import React from 'react'
import { useFela } from 'react-fela'
import { motion } from 'framer-motion'
import { CardsContext } from '~/components/CardsProvider'
import Page from '~/components/Page'
import Card from '~/components/Card'
import CTA from '~/components/CTA'
import Info from '~/components/Info'
import Link from '~/components/Link'
import Notice from '~/components/Notice'
import NumberInput from '~/components/NumberInput'
import ResetButton from '~/components/ResetButton'
import Row from '~/components/Row'
import Select from '~/components/Select'
import ShareDialog from '~/components/ShareDialog'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import openBook from '~/helpers/openBook'
import serialization from '~/helpers/serialization'
import indexArray from '~/helpers/indexArray'
import useViewportSize from '~/hooks/useViewportSize'
import useNavigator from '~/hooks/useNavigator'
import styles from './styles'

const ShareButton = ({ disabled }) => (
  <ShareDialog
    label='Share book'
    disabled={disabled}
    image='https://cdn.sanity.io/images/5hlpazgd/production/7235227a710908d4e81d7f57439bdb4cc4fabbe7-512x512.png'
  >
    <p>
      Your book is automatically saved to the URL of the page as you open it.
      You can safely reload the page, or bookmark it to come back to it later.
    </p>

    <p>
      If you would like to share your book with others, you can easily do so
      with the button below.
    </p>
  </ShareDialog>
)

const CustomBookFields = ({
  amount,
  setAmount,
  expectations,
  setExpectations,
}) => {
  const setExpectation = React.useCallback(
    (index, value) => {
      setExpectations(expectations => [
        ...expectations.slice(0, index),
        value === '' ? '' : Number(value),
        ...expectations.slice(index + 1),
      ])
    },
    [setExpectations]
  )
  const setCommonExpectation = React.useCallback(
    value => setExpectation(0, value),
    [setExpectation]
  )
  const setRareExpectation = React.useCallback(
    value => setExpectation(1, value),
    [setExpectation]
  )
  const setEpicExpectation = React.useCallback(
    value => setExpectation(2, value),
    [setExpectation]
  )
  const setLegendaryExpectation = React.useCallback(
    value => setExpectation(3, value),
    [setExpectation]
  )

  return (
    <>
      <Row>
        <Row.Column>
          <NumberInput
            label='Amount of cards'
            id='amount'
            required
            min={1}
            max={10}
            value={amount}
            onChange={setAmount}
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <NumberInput
            label='Common (%)'
            name='common'
            id='common'
            min={0}
            max={100}
            onChange={setCommonExpectation}
            value={expectations[0]}
          />
        </Row.Column>
        <Row.Column>
          <NumberInput
            label='Rare (%)'
            name='rare'
            id='rare'
            min={0}
            max={100}
            onChange={setRareExpectation}
            value={expectations[1]}
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <NumberInput
            label='Epic (%)'
            name='epic'
            id='epic'
            min={0}
            max={100}
            onChange={setEpicExpectation}
            value={expectations[2]}
          />
        </Row.Column>
        <Row.Column>
          <NumberInput
            label='Legendary (%)'
            name='legendary'
            id='legendary'
            min={0}
            max={100}
            onChange={setLegendaryExpectation}
            value={expectations[3]}
          />
        </Row.Column>
      </Row>
    </>
  )
}

export default React.memo(function BookOpeningSimulator(props) {
  const { cards } = React.useContext(CardsContext)
  const { css } = useFela()
  const navigator = useNavigator()
  const { viewportWidth } = useViewportSize()
  const container = React.useRef(null)
  const [bookId, setBookId] = React.useState('')
  const [deck, setDeck] = React.useState(props.book || [])
  const [amount, setAmount] = React.useState(1)
  const [expectations, setExpectations] = React.useState([25, 25, 25, 25])
  const id = serialization.cards.serialize(deck)
  const booksIndex = indexArray(props.books)

  const isFormValid = React.useMemo(
    () =>
      bookId === 'CUSTOM'
        ? expectations.reduce((a, b) => a + b, 0) === 100
        : Boolean(bookId),
    [bookId, expectations]
  )

  const reset = React.useCallback(() => {
    setBookId('')
    setDeck([])
    setAmount(1)
    setExpectations([25, 25, 25, 25])
  }, [])

  const open = React.useCallback(
    event => {
      event.preventDefault()

      const book =
        bookId !== 'CUSTOM'
          ? booksIndex[bookId]
          : {
              draws: amount,
              odds: expectations.map(expectation => expectation / 100),
            }

      setDeck(openBook(cards, book))
    },
    [cards, booksIndex, bookId, expectations, amount]
  )

  React.useEffect(() => {
    navigator.replace(
      ['/simulators/books', id].filter(Boolean).join('/').toLowerCase()
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Page
      title='Book Simulator'
      description='Recreate the thrill of opening books by playing with this simulator, opening the books of your choice!'
      background='https://cdn.sanity.io/images/5hlpazgd/production/ce4ef835e274c9696c34c75a8ebd908d60d482b5-1920x1080.png'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a small book opening simulator. It has no purpose other than
            enjoying the thrill of opening a new book. Pick the type of book you
            want to open, click the “Open” button below and see what you found!
          </p>
          <Info
            icon='warning'
            title='Important disclaimer'
            spacing={{ top: 'SMALL', bottom: 'LARGE' }}
          >
            <p>
              Please take the outcome of this simulator with a grain of salt.
              This is a best guess and not necessarily representative of actual
              in-game mechanics, especially in regard to fusion stones.
            </p>
          </Info>
          <form onSubmit={open}>
            <Spacing bottom='LARGE'>
              <Select
                label='Book type'
                id='bookId'
                required
                value={bookId}
                onChange={event => setBookId(event.target.value)}
              >
                <option value=''>Pick a book type</option>
                {props.books.map(book => (
                  <option value={book.id} key={book.id}>
                    {book.name} ({book.draws})
                  </option>
                ))}
                <option value='CUSTOM'>Custom Book</option>
              </Select>
            </Spacing>
            {bookId === 'CUSTOM' && (
              <CustomBookFields
                amount={amount}
                setAmount={setAmount}
                expectations={expectations}
                setExpectations={setExpectations}
              />
            )}
            <Row>
              <Row.Column>
                <CTA type='submit' disabled={!isFormValid}>
                  Open
                </CTA>
              </Row.Column>
            </Row>
            <Row withNarrowGutter>
              <Row.Column>
                <ResetButton
                  label='Reset'
                  confirm='Are you sure you want to reset the book?'
                  reset={reset}
                  disabled={deck.length === 0}
                />
              </Row.Column>
              <Row.Column>
                <ShareButton disabled={deck.length === 0} />
              </Row.Column>
            </Row>
          </form>

          <Info icon='equalizer' title='Book Odds Calculator'>
            <p>
              If you are looking to figure out the odds of finding a certain
              card or type of cards when opening in-game books, have a look at
              the <Link to='/calculators/books'>Book Odds Calculator</Link>.
            </p>
          </Info>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Your book contains…</Title>

          {deck.length ? (
            <div
              ref={container}
              style={{
                '--cards-per-row': viewportWidth > 700 ? 3 : 2,
              }}
            >
              <motion.ul className={css(styles.list)}>
                {deck.map((card, index) => (
                  <motion.li
                    className={css(styles.item)}
                    id={'card-' + card.id}
                    key={card.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                      ease: 'easeOut',
                      duration: 0.3,
                      delay: index * 0.25,
                    }}
                  >
                    <Card {...card} key={card.id} />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ) : (
            <Notice icon='stack'>
              Pick a book type and open your book to see what’s inside!
            </Notice>
          )}
        </Row.Column>
      </Row>
    </Page>
  )
})
