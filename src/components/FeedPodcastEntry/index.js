import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import MemberList from '../MemberList'
import { PODCAST_EPISODES } from '../../constants/misc'

export default React.memo(function FeedPodcastEntry(props) {
  const episode = PODCAST_EPISODES.find(
    episode => episode.title === props.title
  )
  const name = props.authors.find(author => author.toLowerCase() === props.user)

  return (
    <FeedEntry icon='star' date={props.date}>
      {name} has published
      {props.authors.length > 1 ? (
        <>
          , alongside{' '}
          <MemberList
            members={props.authors.filter(author => author !== name)}
          />
          ,
        </>
      ) : null}{' '}
      an episode of the Brewed Sages podcast named{' '}
      <Link to='/brewed-sages'>{episode.title}</Link> ({episode.meta}
      ).
      <blockquote>{episode.excerpt}</blockquote>
    </FeedEntry>
  )
})
