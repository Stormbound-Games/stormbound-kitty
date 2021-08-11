import React from 'react'
import DeckSingleAdvice from '../DeckSingleAdvice'
import LearnMoreIcon from '../LearnMoreIcon'
import Title from '../Title'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import getDeckAdvice from '../../helpers/getDeckAdvice'

export default React.memo(function DeckAdvice(props) {
  const [isEmpty, setIsEmpty] = React.useState(false)
  const deckAdvice = React.useMemo(
    () => getDeckAdvice(props.deck.map(getResolvedCardData), props.modifier),
    [props.deck, props.modifier]
  )

  React.useEffect(() => {
    Promise.all(deckAdvice).then(advice => {
      setIsEmpty(advice.filter(Boolean).length === 0)
    })
  }, [deckAdvice])

  return (
    <div className='DeckAdvice'>
      <Title>
        Suggestions <LearnMoreIcon anchor='#incorrect-deck-advice' />
      </Title>

      {deckAdvice.map((resolveAdvice, index) => (
        <DeckSingleAdvice
          key={index}
          resolve={resolveAdvice}
          highlight={props.highlight}
        />
      ))}

      {isEmpty && (
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
})
