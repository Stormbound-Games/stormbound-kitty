import React from 'react'
import microMarkdown from '~/helpers/microMarkdown'
import HorizontalRule from '~/components/HorizontalRule'

export default React.memo(function MicroMarkdown(props) {
  return props.content.split('\n').map((paragraph, index) => {
    if (paragraph.trim().length === 0) return null
    if (paragraph.trim() === '---') return <HorizontalRule key={index} />

    return <p key={index}>{microMarkdown(paragraph)}</p>
  })
})
