import React from 'react'
import { BOOKS, PRE_MADE_EXPECTATIONS } from '../../constants/game'
import Title from '../Title'
import getDrawingProbability from '../../helpers/getDrawingProbability'
import capitalise from '../../helpers/capitalise'

const BookOdds = props => {
  const { draws } = BOOKS[props.book]
  const bookName = capitalise(props.book.toLowerCase())
  const subject = props.isAdvancedMode
    ? 'at least one of the cards you want'
    : PRE_MADE_EXPECTATIONS[props.target].label.toLowerCase()
  const chances = props.isAdvancedMode
    ? getDrawingProbability(props.book, props.expectations)
    : getDrawingProbability(
        props.book,
        PRE_MADE_EXPECTATIONS[props.target].expectations
      )

  if (props.isAdvancedMode && props.expectations.join('') === '0000') {
    return (
      <p>
        Define how many different cards you need of each rarity to get the odds
        of drawing at least one of them in a {bookName}.
      </p>
    )
  }

  if (Number(chances) === 0) {
    return (
      <p>
        It is not possible to pull {subject} because this rarity does not appear
        in this type of book.
      </p>
    )
  }

  return (
    <p>
      The odds to find {subject} in a {bookName} book after the {draws} draws
      are:{' '}
      <Title
        element='span'
        className='BooksCalculator__result'
        data-testid='odds-result'
      >
        {(chances * 100).toFixed(2)}%
      </Title>
    </p>
  )
}

export default BookOdds
