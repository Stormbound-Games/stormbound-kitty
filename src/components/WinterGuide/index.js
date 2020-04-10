import React from 'react'
import Markdown from '../Markdown'
import Guide from '../Guide'
import guide from '../../data/Winter_guide.md'

const WinterGuide = props => {
  const [content, setContent] = React.useState(null)

  React.useEffect(() => {
    fetch(guide)
      .then(response => response.text())
      .then(setContent)
  }, [])

  return content ? (
    <Guide
      title='Winter Guide'
      description='A Stormbound guide to learn how to play Winter Pact'
      author='WinterBoii'
    >
      <Markdown source={content} />
    </Guide>
  ) : null
}

export default WinterGuide
