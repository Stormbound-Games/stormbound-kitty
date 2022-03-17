import React from 'react'
import Link from '~/components/Link'
import FeedEntry from '~/components/FeedEntry'
import MemberList from '~/components/MemberList'
import { CATEGORIES } from '~/constants/guides'

export default React.memo(function CardFeedGuideEntry(props) {
  const category = CATEGORIES[props.category].name.short.toLowerCase()
  const prefix = /^[aeiou]/.test(category) ? 'an' : 'a'

  return (
    <FeedEntry icon='compass' date={props.date}>
      <MemberList members={props.authors} />{' '}
      {props.authors.length > 1 ? 'have' : 'has'} written {prefix} {category}{' '}
      guide about this card called{' '}
      <Link to={'/guides/' + props.slug}>{props.name}</Link>.
      <blockquote>{props.excerpt}</blockquote>
    </FeedEntry>
  )
})
