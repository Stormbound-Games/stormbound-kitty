import React from 'react'
import LearnMoreIcon from '../LearnMoreIcon'
import Title from '../Title'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getDeckAdvice from '../../helpers/getDeckAdvice'

export default function DeckAdvice(props) {
  const cards = props.deck.map(getResolvedCardData)
  const suggestions = getDeckAdvice(cards, props.modifier)

  return (
    <div className='DeckAdvice'>
      <Title>
        Suggestions <LearnMoreIcon anchor='#incorrect-deck-suggestions' />
      </Title>

      {suggestions.length > 0 ? (
        suggestions.map(suggestion => (
          <p
            key={suggestion.name}
            onMouseOver={
              suggestion.highlight
                ? () => props.highlight(suggestion.highlight)
                : undefined
            }
            onMouseOut={() => props.highlight([])}
          >
            <strong className='Highlight'>{suggestion.name}:</strong>{' '}
            {suggestion.description}
          </p>
        ))
      ) : (
        <>
          <p>
            No particular suggestions could be found for that deck. It likely
            means this is a solid and well balanced deck, so kudos and enjoy
            playing it!{'  '}
            <span role='img' aria-label='Party'>
              🎉
            </span>
          </p>
          <p>
            If you think something should be said about it however, please get
            in touch with <span className='Highlight'>Kitty#1909</span> on
            Discord to discuss potential improvements.
          </p>
        </>
      )}
    </div>
  )
}
