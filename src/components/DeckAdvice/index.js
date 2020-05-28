import React from 'react'
import LearnMoreIcon from '../LearnMoreIcon'
import Title from '../Title'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getDeckAdvice from '../../helpers/getDeckAdvice'

export default function DeckAdvice(props) {
  const cards = props.deck.map(getResolvedCardData)
  const suggestions = getDeckAdvice(cards, props.highlight)

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className='DeckAdvice'>
      <Title>
        Suggestions <LearnMoreIcon anchor='#incorrect-deck-suggestions' />
      </Title>

      {suggestions.map(suggestion => (
        <p
          key={suggestion.name}
          onMouseOver={
            suggestion.highlight
              ? () => props.highlight(suggestion.highlight(cards))
              : undefined
          }
          onMouseOut={() => props.highlight([])}
          id={suggestion.id}
        >
          <strong className='Highlight'>{suggestion.name}:</strong>{' '}
          {suggestion.description}
        </p>
      ))}
    </div>
  )
}
