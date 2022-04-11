import React from 'react'
import Link from '~/components/Link'
import { RESTRICTIONS } from '~/constants/puzzles'
import Teaser from '~/components/Teaser'
import { formatDate } from '~/helpers/formatDate'
import parseDate from '~/helpers/parseDate'
import capitalize from '~/helpers/capitalize'

export const getCardForPuzzle = puzzle => ({
  name: puzzle.name,
  type: 'unit',
  race: puzzle.category,
  mana: puzzle.difficulty,
  rarity: 'common',
  faction: 'neutral',
  image: puzzle.image,
  ability: puzzle.restrictions
    .map(restriction => RESTRICTIONS[restriction].name)
    .join(', '),
})

export const getExcerptForPuzzle = puzzle => (
  <>
    {capitalize(puzzle.category.toLowerCase())} puzzle created by{' '}
    <Link to={`/members/${puzzle.user.slug}`}>{puzzle.user.name}</Link> in{' '}
    {formatDate(parseDate(puzzle.date))}. Difficulty: {puzzle.difficulty}/3.{' '}
    {puzzle.restrictions.length > 0
      ? puzzle.restrictions
          .slice(0)
          .sort()
          .map((restriction, index) => (
            <React.Fragment key={restriction}>
              <span title={RESTRICTIONS[restriction].description}>
                {RESTRICTIONS[restriction].name}
              </span>
              {index !== puzzle.restrictions.length - 1 && ', '}
            </React.Fragment>
          ))
      : 'No restrictions'}
    .
  </>
)

export default React.memo(function BattleSimPuzzle(props) {
  const date = parseDate(props.date)

  return (
    <Teaser
      card={getCardForPuzzle(props)}
      title={props.name}
      meta={`Made in ${formatDate(date)}`}
      to={`/puzzles/${props.board}`}
      excerpt={getExcerptForPuzzle(props)}
      data-testid='puzzle'
    />
  )
})
