import React from 'react'
import guide from '../../data/Pirate_guide.md'
import Guide from '../Guide'
import Markdown from '../Markdown'

const GuidePirate = props => {
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

export default GuidePirate
