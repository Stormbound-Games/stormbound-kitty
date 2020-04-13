import React from 'react'
import cards from '../../data/cards'
import { RARITIES } from '../../constants/game'
import Column from '../Column'
import CTA from '../CTA'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import shuffle from '../../helpers/shuffle'
import capitalise from '../../helpers/capitalise'
import './index.css'

const sum = (a, b) => a + b

const CARD_COUNTS = Object.keys(RARITIES).map(
  rarity => cards.filter(card => card.rarity === rarity).length
)

const BOOKS = {
  NOBLE: { percentiles: [70, 25, 4, 1], draws: 3 },
  ELDER: { percentiles: [0, 67, 30, 3], draws: 1 },
  CLASSIC: { percentiles: [70, 25, 4, 1], draws: 6 },
  HEROIC: { percentiles: [0, 70, 25, 5], draws: 6 },
  MYTHIC: { percentiles: [0, 0, 70, 30], draws: 6 },
}

const getDrawingChance = bookType => {
  const { percentiles, draws } = BOOKS[bookType]
  const chances = percentiles.map((_, index, array) =>
    array.slice(0, index + 1).reduce(sum, 0)
  )
  const pools = CARD_COUNTS.map(count =>
    shuffle(Array.from({ length: count + 1 }, (_, i) => i))
  )

  for (let i = 0; i < draws; i++) {
    const random = Math.random() * 100
    const rarity = chances.findIndex(chance => chance > random)
    if (pools[rarity].pop() === 0) return true
  }

  return false
}

const getDrawingChances = (bookType, amount) => {
  let found = 0
  for (let i = 0; i < amount; i++) found += Number(getDrawingChance(bookType))

  return (found / amount).toFixed(4)
}

const BooksCalculator = props => {
  const [book, setBook] = React.useState('MYTHIC')
  const [amount, setAmount] = React.useState(50000)
  const chances = React.useMemo(() => getDrawingChances(book, amount), [
    amount,
    book,
  ])

  return (
    <>
      <h1 className='visually-hidden'>Books Calculator</h1>

      <Row desktopOnly wideGutter>
        <Column width={33}>
          <Title>Configuration</Title>
          <form>
            <Row>
              <Column>
                <label htmlFor='book'>Book type</label>
                <select
                  id='book'
                  name='book'
                  value={book}
                  onChange={event => setBook(event.target.value)}
                >
                  <option value='MYTHIC'>Mythic</option>
                  <option value='HEROIC'>Heroic</option>
                  <option value='CLASSIC'>Classic</option>
                  <option value='NOBLE'>Noble</option>
                  <option value='ELDER'>Elder</option>
                </select>
              </Column>
              <Column>
                <label htmlFor='amount'>Amount</label>
                <input
                  type='number'
                  name='amount'
                  id='amount'
                  min={100}
                  max={100000}
                  step={100}
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                  required
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <CTA type='button' onClick={() => window.location.reload()}>
                  Recompute chances
                </CTA>
              </Column>
            </Row>
          </form>
        </Column>
        <Column width={66}>
          <Title>Outcome</Title>
          <p className='BookCalculator__outcome'>
            Given {amount} book openings, the estimated chances to find{' '}
            <strong>Fusion Stones</strong> in a {capitalise(book.toLowerCase())}{' '}
            book are about {chances}%. That is, not a lot. Good luck.
          </p>
        </Column>
      </Row>

      <PageMeta
        title='Books Calculator'
        description='Calculate draw chances in books.'
      />
    </>
  )
}

export default BooksCalculator
