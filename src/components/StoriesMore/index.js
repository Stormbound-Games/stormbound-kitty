import React from 'react'
import Link from '../Link'
import Title from '../Title'
import Stories from '../Stories'
import stories from '../../data/stories'

export default React.memo(function StoriesMore(props) {
  const isNotCurrent = story => props.title !== story.title

  if (props.saga) {
    const chapters = stories
      .filter(story => story.saga === props.saga)
      .sort((a, b) => {
        const indexA = parseInt(a.title, 10)
        const indexB = parseInt(b.title, 10)

        return isNaN(indexA) || isNaN(indexB) ? 0 : indexA - indexB
      })

    return (
      <>
        <Title>Other chapters from this saga</Title>
        <Stories stories={chapters.filter(isNotCurrent)} />
      </>
    )
  }

  const storiesFromAuthor = stories.filter(
    story => story.author === props.author && !story.saga
  )

  if (storiesFromAuthor.length > 1) {
    return (
      <>
        <Title>
          Other stories by{' '}
          <Link to={`/member/${props.author}`}>{props.author}</Link>
        </Title>
        <Stories stories={storiesFromAuthor.filter(isNotCurrent)} />
      </>
    )
  }

  return null
})
