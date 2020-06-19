import React from 'react'

export default React.memo(function DeckSingleAdvice(props) {
  const givenAdvice = props.advice
  const [advice, setAdvice] = React.useState(
    // The given `advice` prop can be a fully resolved advice with a name,
    // description and optional highlight key, or it can be a promise that still
    // needs to be resolved.
    givenAdvice.name ? givenAdvice : {}
  )
  React.useEffect(() => {
    if (givenAdvice.then) {
      givenAdvice.then(answer => setAdvice(answer || {}))
    }
  }, [givenAdvice])

  if (!advice.name) return null

  return (
    <p
      key={advice.name}
      onMouseOver={
        advice.highlight ? () => props.highlight(advice.highlight) : undefined
      }
      onMouseOut={advice.highlight ? () => props.highlight([]) : undefined}
    >
      <strong className='Highlight'>{advice.name}:</strong> {advice.description}
    </p>
  )
})
