import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'
import { GUIDE_CATEGORIES } from '~/constants/guides'

export default React.memo(function FeedGuideEntry(props) {
  const category = GUIDE_CATEGORIES[props.category].name.short.toLowerCase()
  const prefix = /^[aeiou]/.test(category) ? 'an' : 'a'

  return (
    <FeedEntry icon='compass' date={props.date}>
      {props.user.name} has written
      {props.authors.length > 1 ? (
        <>
          , alongside{' '}
          <MemberList
            members={props.authors.filter(
              author => author.slug !== props.user.slug
            )}
          />
          ,
        </>
      ) : null}{' '}
      {prefix} {category} guide called{' '}
      <Link to={'/guides/' + props.slug}>{props.name}</Link>.
      <blockquote>{props.excerpt}</blockquote>
    </FeedEntry>
  )
})
