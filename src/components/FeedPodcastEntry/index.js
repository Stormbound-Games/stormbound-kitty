import React from 'react'
import { Link } from 'react-router-dom'
import FeedEntry from '../FeedEntry'
import MemberList from '../MemberList'
import podcasts from '../../data/podcasts'

export default React.memo(function FeedPodcastEntry(props) {
  const episode = podcasts.find(episode => episode.title === props.title)
  const name = props.hosts.find(host => host.toLowerCase() === props.user)

  return (
    <FeedEntry icon='bubbles' date={props.date}>
      {name} has featured in
      {props.hosts.length > 1 ? (
        <>
          , alongside{' '}
          <MemberList members={props.hosts.filter(host => host !== name)} />,
        </>
      ) : null}{' '}
      an episode of the Brewed Sages podcast named{' '}
      <Link to='/brewed-sages'>{episode.title}</Link> ({episode.meta}
      ).
      <blockquote>{episode.excerpt}</blockquote>
    </FeedEntry>
  )
})
