import React from 'react'
import Link from '../Link'
import FeedEntry from '../FeedEntry'
import MemberList from '../MemberList'
import PODCASTS from '../../data/podcasts'
import indexArray from '../../helpers/indexArray'

const PODCASTS_INDEX = indexArray(PODCASTS, 'title')

export default React.memo(function FeedPodcastEntry(props) {
  const episode = PODCASTS_INDEX[props.title]
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
