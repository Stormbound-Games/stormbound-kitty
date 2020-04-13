import React from 'react'
import cards from '../../data/cards'
import { RARITIES } from '../../constants/game'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import shuffle from '../../helpers/shuffle'
import capitalise from '../../helpers/capitalise'
import { getRarityImage } from '../../helpers/getRarity'
import './index.css'

const sum = (a, b) => a + b

const CARD_COUNTS = Object.keys(RARITIES).map(
  rarity => cards.filter(card => card.rarity === rarity).length
)

console.log(CARD_COUNTS)

const BOOKS = {
  NOBLE: { percentiles: [70, 25, 4, 1], draws: 3 },
  ELDER: { percentiles: [0, 67, 30, 3], draws: 1 },
  CLASSIC: { percentiles: [70, 25, 4, 1], draws: 6 },
  HEROIC: { percentiles: [0, 70, 25, 5], draws: 6 },
  MYTHIC: { percentiles: [0, 0, 70, 30], draws: 6 },
}

const isExpectedCard = (bookType, target) => {
  const { percentiles, draws } = BOOKS[bookType]
  const expectedRarity = Object.keys(RARITIES).indexOf(target.toLowerCase())
  const chances = percentiles.map((_, index, array) =>
    array.slice(0, index + 1).reduce(sum, 0)
  )
  const pools = CARD_COUNTS.map(count =>
    shuffle(Array.from({ length: count + 1 }, (_, i) => i))
  )

  for (let i = 0; i < draws; i++) {
    const random = Math.random() * 100
    const rarity = chances.findIndex(chance => chance > random)

    // If looking for a card of specific rarity, and the draw did not yield the
    // expected rarity, then no need to even check whether the card is the
    // expected one.
    if (target !== 'FUSION_STONES' && rarity !== expectedRarity) {
      return false
    }

    if (pools[rarity].pop() === 0) return true
  }

  return false
}

const getDrawingChances = (bookType, target, amount) => {
  let found = 0
  for (let i = 0; i < amount; i++)
    found += Number(isExpectedCard(bookType, target))

  return (found / amount).toFixed(4)
}

const Image = props => {
  return props.target === 'FUSION_STONES' ? (
    <img
      className='BookCalculator__image'
      src='/assets/images/stones.png'
      alt='Fusion Stones'
    />
  ) : (
    <img
      className='BookCalculator__image'
      src={getRarityImage(props.target.toLowerCase())}
      alt={props.target.toLowerCase()}
    />
  )
}

const BooksCalculator = props => {
  const [book, setBook] = React.useState('MYTHIC')
  const [amount, setAmount] = React.useState(2500)
  const [target, setTarget] = React.useState('FUSION_STONES')
  const chances = React.useMemo(() => getDrawingChances(book, target, amount), [
    amount,
    book,
    target,
  ])
  const options = {
    FUSION_STONES: 'Fusion stones',
    COMMON: 'A specific common card',
    RARE: 'A specific rare card',
    EPIC: 'A specific epic card',
    LEGENDARY: 'A specific legendary card',
  }

  return (
    <>
      <h1 className='visually-hidden'>Books Calculator</h1>

      <Row desktopOnly wideGutter>
        <Column width={33}>
          <Title element='h2'>Configuration</Title>
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
                <label htmlFor='amount'>Amount of books</label>
                <input
                  type='number'
                  name='amount'
                  id='amount'
                  min={100}
                  max={50000}
                  step={100}
                  value={amount}
                  onChange={event => setAmount(event.target.value)}
                  required
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <label htmlFor='target'>Looking for</label>
                <select
                  id='target'
                  name='target'
                  value={target}
                  onChange={event => setTarget(event.target.value)}
                >
                  {Object.keys(options).map(option => (
                    <option key={option} value={option}>
                      {options[option]}
                    </option>
                  ))}
                </select>
              </Column>
            </Row>
          </form>
        </Column>
        <Column width={66}>
          <Title element='h2'>Outcome</Title>

          {!amount ? (
            <p className='BookCalculator__outcome'>
              Open at least a book to compute drawing chances.
            </p>
          ) : (
            <>
              {Number(chances) === 0 ? (
                <p className='BookCalculator__outcome'>
                  <Image target={target} />
                  Given {amount} book openings, it is unlikely to find{' '}
                  <strong>{options[target].toLowerCase()}</strong> at all —
                  either because this rarity does not appear in this type of
                  book, or because it’s simply is too low to be significant.
                </p>
              ) : (
                <p className='BookCalculator__outcome'>
                  <Image target={target} />
                  Given {amount} book openings, the estimated chances to find{' '}
                  <strong>{options[target]}</strong> in a{' '}
                  {capitalise(book.toLowerCase())} book are about {chances}%.
                  That is, not a lot. Good luck.
                </p>
              )}
            </>
          )}
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
