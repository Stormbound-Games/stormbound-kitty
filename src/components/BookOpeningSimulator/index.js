import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../Card'
import CTA from '../CTA'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import Notice from '../Notice'
import Row from '../Row'
import Title from '../Title'
import arrayRandom from '../../helpers/arrayRandom'
import capitalise from '../../helpers/capitalise'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCardMatchingCriteria from '../../helpers/isCardMatchingCriteria'
import useViewportSize from '../../hooks/useViewportSize'
import cards from '../../data/cards'
import { RARITIES, BOOKS } from '../../constants/game'
import './index.css'

const computeOdds = percentiles =>
  [0].concat(
    percentiles.map((_, index, array) =>
      array.slice(0, index + 1).reduce((a, b) => a + b, 0)
    )
  )

const drawCard = ({ percentiles, only }, drawnIds) => {
  const random = Math.random()
  const index = computeOdds(percentiles).findIndex(odd => odd > random) - 1
  const rarity = Object.keys(RARITIES)[index]
  const pool = cards
    .filter(isCardMatchingCriteria({ ...only, rarity }))
    .filter(card => !drawnIds.includes(card.id))

  return getResolvedCardData({ id: arrayRandom(pool).id, level: 1 })
}

const drawCards = book =>
  Array.from({ length: book.draws }).reduce(
    acc => [
      ...acc,
      drawCard(
        book,
        acc.map(card => card.id)
      ),
    ],
    []
  )

const BookOpeningSimulator = props => {
  const { viewportWidth } = useViewportSize()
  const container = React.useRef(null)
  const [bookType, setBookType] = React.useState('')
  const book = bookType ? BOOKS[bookType] : null
  const [cards, setCards] = React.useState([])

  const open = React.useCallback(
    event => {
      event.preventDefault()
      setCards(drawCards(book))
    },
    [book]
  )

  return (
    <>
      <HeaderBanner
        title='Book Simulator'
        background='/assets/images/wallpapers/lite/wp-d-6.png'
      />
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a small book opening simulator. It has no purpose other than
            enjoying the thrill of opening a new book. Pick the type of book you
            want to open, click the “Open” button below and see what you found!
          </p>
          <form onSubmit={open}>
            <label htmlFor='bookType'>Book type</label>
            <select
              id='bookType'
              name='bookType'
              required
              value={bookType}
              onChange={event => setBookType(event.target.value)}
              style={{ marginBottom: '2em' }}
            >
              <option value=''>Pick a book type</option>
              {Object.keys(BOOKS).map(book => (
                <option value={book} key={book}>
                  {capitalise(book.toLowerCase())} book ({BOOKS[book].draws})
                </option>
              ))}
            </select>
            <Row>
              <Row.Column>
                <CTA type='submit'>Open</CTA>
              </Row.Column>
              <Row.Column>
                <CTA
                  type='button'
                  disabled={cards.length === 0}
                  onClick={() => {
                    setBookType('')
                    setCards([])
                  }}
                >
                  Reset
                </CTA>
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
              <motion.ul className='BookOpeningSimulator__list'>
                {cards.map((card, index) => (
                  <motion.li
                    className='BookOpeningSimulator__item'
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
    </>
  )
}

export default React.memo(BookOpeningSimulator)
