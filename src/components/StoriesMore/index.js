import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title'
import Stories from '../Stories'
import useFetch from '../../hooks/useFetch'

export default React.memo(function StoriesMore(props) {
  const { data: stories = [] } = useFetch('/stories.json')
  const isNotCurrent = story => props.title !== story.title

  if (props.category === 'eastern-heat') {
    const chapters = stories.filter(s => s.category === props.category)

    return (
      <>
        <Title>Other chapters from Eastern Heat</Title>
        <Stories stories={chapters.filter(isNotCurrent)} columns={3} />
      </>
    )
  }

  const storiesFromAuthor = stories.filter(s => s.author === props.author)

  if (storiesFromAuthor.length > 1) {
    return (
      <>
        <Title>
          Other stories by{' '}
          <Link to={`/member/${props.author}`}>{props.author}</Link>
        </Title>
        <Stories stories={storiesFromAuthor.filter(isNotCurrent)} columns={3} />
      </>
    )
  }

  return null
})
