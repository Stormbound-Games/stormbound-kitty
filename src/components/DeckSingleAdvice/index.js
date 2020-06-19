import React from 'react'

export default React.memo(function DeckSingleAdvice(props) {
  const [advice, setAdvice] = React.useState({})

  React.useEffect(() => {
    props.resolve.then(advice => setAdvice(advice || {}))
  }, [props.resolve])

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
