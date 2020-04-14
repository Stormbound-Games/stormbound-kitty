import React from 'react'
import { RARITIES } from '../../constants/game'
import Column from '../Column'
import Image from '../Image'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import capitalise from '../../helpers/capitalise'
import getDrawingProbability, {
  BOOKS,
} from '../../helpers/getDrawingProbability'
import { getRarityImage } from '../../helpers/getRarity'
import './index.css'

const BookExplanation = ({ book }) => {
  const { percentiles, draws } = BOOKS[book]

  return (
    <div>
      <p>
        A {capitalise(book.toLowerCase())} book contains {draws}{' '}
        {draws > 1 ? 'cards' : 'card'}. It can contain fusion stones and cannot
        contain more than a single copy of a single card.
      </p>
      <p>The chances to draw are as follow:</p>
      <ul>
        {Object.keys(RARITIES).map((rarity, index) => (
          <li key={rarity}>
            {percentiles[index]}% chance of pulling a {rarity} card
          </li>
        ))}
      </ul>
    </div>
  )
}

const BooksCalculator = props => {
  const [book, setBook] = React.useState('MYTHIC')
  const [target, setTarget] = React.useState('FUSION_STONES')
  const chances = React.useMemo(() => getDrawingProbability(book, target), [
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
          <Title element='h2'>What is this?</Title>
          <p>
            This is a calculator to estimate the odds of getting fusion stones
            or a specific card when opening a certain book. Huge thanks to
            Neicigam (Neicigam#0095 on Discord) for helping with the math and
            the logic making this simulator possible.
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

        <Column width={33}>
          <Title element='h2'>Outcome</Title>

          <BookExplanation book={book} />

          <p className='BookCalculator__outcome'>
            {Number(chances) === 0 ? (
              <>
                It is not possible to pull {options[target].toLowerCase()}{' '}
                because this rarity does not appear in this type of book.
              </>
            ) : (
              <>
                The odds to find {options[target]} in a{' '}
                {capitalise(book.toLowerCase())} book about after the{' '}
                {BOOKS[book].draws} draws are:{' '}
                <Title as='span' className='BooksCalculator__result'>
                  {chances.toFixed(2)}%
                </Title>
              </>
            )}
          </p>
        </Column>

        <Column width={33}>
          <div className='BooksCalculator__wrap'>
            <Image
              src={'/assets/images/book-' + book.toLowerCase() + '.png'}
              className='BooksCalculator__book'
              alt={capitalise(book.toLowerCase()) + ' book'}
            />
            <Image
              src={
                target === 'FUSION_STONES'
                  ? '/assets/images/stones.png'
                  : getRarityImage(target.toLowerCase())
              }
              className='BooksCalculator__image'
              alt=''
            />
          </div>
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
