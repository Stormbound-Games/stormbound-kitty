import React from 'react'
import Title from '../Title'
import microMarkdown from '../../helpers/microMarkdown'
import './index.css'

export default React.memo(function StoryContent(props) {
  return (
    <article className='StoryContent'>
      <Title element='h1' className='StoryContent__title'>
        {props.title}
      </Title>

      {props.content.split('\n').map((paragraph, index) => {
        if (paragraph.trim().length === 0) return null
        if (paragraph.trim() === '---') return <hr key={index} />

        return (
          <p key={index} className='StoryContent__paragraph'>
            {microMarkdown(paragraph)}
          </p>
        )
      })}
    </article>
  )
})
