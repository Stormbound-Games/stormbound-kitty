import React from 'react'
import LearnMoreIcon from '~/components/LearnMoreIcon'
import Title from '~/components/Title'

const Advice = props => (
  <p
    key={props.name}
    onMouseOver={
      props.highlight ? () => props.highlightCards(props.highlight) : undefined
    }
    onMouseOut={props.highlight ? () => props.highlightCards([]) : undefined}
  >
    <strong className='Highlight'>{props.name}:</strong> {props.description}
  </p>
)

export default React.memo(function DeckAdvice(props) {
  return (
    <>
      <Title>
        Suggestions <LearnMoreIcon anchor='#incorrect-deck-advice' />
      </Title>

      {props.advice.length > 0 ? (
        props.advice.map(advice => (
          <Advice
            {...advice}
            key={advice.name}
            highlightCards={props.highlight}
          />
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
    </>
  )
})
