import React from 'react'
import Markdown from '../Markdown'
import Guide from '../Guide'
import guide from '../../data/Pirate_guide.md'

const PirateGuide = props => {
  const [content, setContent] = React.useState(null)

  React.useEffect(() => {
    fetch(guide)
      .then(response => response.text())
      .then(setContent)
  }, [])

  return content ? (
    <Guide
      title='Pirate Guide'
      description='A Stormbound guide to learn how to play Pirate decks'
      author='MooreFunn'
    >
      <Markdown source={content} />
    </Guide>
  ) : null
}

export default PirateGuide
