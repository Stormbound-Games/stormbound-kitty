import React from 'react'
import Guide from '../Guide'
import Markdown from '../Markdown'
import guide from '../../data/Stormbound_guide.md'
import './index.css'

const GuideComplete = React.memo(function GuideComplete(props) {
  const [content, setContent] = React.useState(null)

  React.useEffect(() => {
    fetch(guide)
      .then(response => response.text())
      .then(setContent)
  }, [])

  return content ? (
    <Guide
      title='Stormbound Guide'
      description='A complete Stormbound Guide by Arikrat'
      author='Arikrat'
      className='GuideComplete'
    >
      <Markdown source={content} />
    </Guide>
  ) : null
})

export default GuideComplete
