import React from 'react'
import data from '../../data/Winter_guide.md'
import guides from '../../data/guides'
import Guide from '../Guide'
import Markdown from '../Markdown'

const guide = guides.find(g => g.id === 'WINTER_GUIDE')

export default React.memo(function GuideWinter(props) {
  const [content, setContent] = React.useState(null)

  React.useEffect(() => {
    fetch(data)
      .then(response => response.text())
      .then(setContent)
  }, [])

  return content ? (
    <Guide {...guide}>
      <Markdown source={content} />
    </Guide>
  ) : null
})
