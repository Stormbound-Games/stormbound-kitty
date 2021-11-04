import React from 'react'
import { useFela } from 'react-fela'
import { motion } from 'framer-motion'
import Page from '~/components/Page'
import Card from '~/components/Card'
import CTA from '~/components/CTA'
import Icon from '~/components/Icon'
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
import getBookName from '~/helpers/getBookName'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import useViewportSize from '~/hooks/useViewportSize'
import useNavigator from '~/hooks/useNavigator'
import { BOOKS } from '~/constants/books'
import styles from './styles'

const ShareButton = ({ disabled }) => (
  <ShareDialog
    label='Share book'
    disabled={disabled}
    image='/assets/images/cards/rogue_sheep.png'
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
  const { css } = useFela()
  const navigator = useNavigator()
  const { viewportWidth } = useViewportSize()
  const container = React.useRef(null)
  const [bookType, setBookType] = React.useState('')
  const [cards, setCards] = React.useState(props.cards || [])
  const [amount, setAmount] = React.useState(1)
  const [expectations, setExpectations] = React.useState([25, 25, 25, 25])
  const id = serialization.cards.serialize(cards)

  const isFormValid = React.useMemo(
    () =>
      bookType === 'CUSTOM'
        ? expectations.reduce((a, b) => a + b, 0) === 100
        : Boolean(bookType),
    [bookType, expectations]
  )

  const reset = React.useCallback(() => {
    setBookType('')
    setCards([])
    setAmount(1)
    setExpectations([25, 25, 25, 25])
  }, [])

  const open = React.useCallback(
    event => {
      event.preventDefault()

      const book =
        bookType !== 'CUSTOM'
          ? BOOKS[bookType]
          : {
              draws: amount,
              percentiles: expectations.map(expectation => expectation / 100),
            }

      setCards(openBook(book))
    },
    [bookType, expectations, amount]
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
      background='/assets/images/wallpapers/lite/wp-d-6.png'
    >
      <Row isDesktopOnly>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a small book opening simulator. It has no purpose other than
            enjoying the thrill of opening a new book. Pick the type of book you
            want to open, click the “Open” button below and see what you found!
          </p>
          <p>
            <Icon icon='warning' /> <strong>Disclaimer:</strong> Please take the
            outcome of this simulator with a grain of salt. This is a best guess
            and not necessarily representative of actual in-game mechanics,
            especially in regard to fusion stones.
          </p>
          <form onSubmit={open}>
            <Spacing bottom='LARGE'>
              <Select
                label='Book type'
                id='bookType'
                required
                value={bookType}
                onChange={event => setBookType(event.target.value)}
              >
                <option value=''>Pick a book type</option>
                {Object.keys(BOOKS).map(bookType => (
                  <option value={bookType} key={bookType}>
                    {getBookName(bookType)} ({BOOKS[bookType].draws})
                  </option>
                ))}
                <option value='CUSTOM'>Custom Book</option>
              </Select>
            </Spacing>
            {bookType === 'CUSTOM' && (
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
                  disabled={cards.length === 0}
                />
              </Row.Column>
              <Row.Column>
                <ShareButton disabled={cards.length === 0} />
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

          {cards.length ? (
            <div
              ref={container}
              style={{
                '--cards-per-row': viewportWidth > 700 ? 3 : 2,
              }}
            >
              <motion.ul className={css(styles.list)}>
                {cards.map((card, index) => (
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
