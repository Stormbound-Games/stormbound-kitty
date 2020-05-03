import React from 'react'
import { Link } from 'react-router-dom'
import Teaser from '../Teaser'
import getExcerpt from '../../helpers/getExcerpt'
import getReadingTime from '../../helpers/getReadingTime'
import './index.css'

const StoryMeta = props => (
  <>
    <Link className='StoryTeaser__author' to={'/member/' + props.author}>
      {props.author}
    </Link>{' '}
    · {getReadingTime(props.content)}
  </>
)

export default React.memo(function StoryTeaser(props) {
  const id =
    props.id ||
    window.btoa(encodeURIComponent(props.title + '-' + props.author))
  const excerpt = getExcerpt(props.content, 150)
  const meta = <StoryMeta {...props} />

  return (
    <Teaser {...props} meta={meta} excerpt={excerpt} to={`/stories/${id}`} />
  )
})
