import React from 'react'
import Guide from '../Guide'
import Markdown from '../Markdown'
import data from '../../data/Stormbound_guide.md'
import guides from '../../data/guides'

export default React.memo(function GuideComplete(props) {
  const guide = guides.find(g => g.id === 'COMPLETE_GUIDE')
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
