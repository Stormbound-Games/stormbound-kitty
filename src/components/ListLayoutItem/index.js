import React from 'react'
import { useFela } from 'react-fela'
import Spacing from '~/components/Spacing'
import FeedEntry from '~/components/FeedEntry'
import Link from '~/components/Link'
import MemberList from '~/components/MemberList'
import styles from './styles'

export default React.memo(function ListLayoutItem(props) {
  const { css } = useFela()
  const authors = Array.isArray(props.authors)
    ? props.authors
    : [props.author].filter(Boolean)

  return (
    <Spacing key={props.title} vertical='BASE'>
      <FeedEntry
        icon={props.icon}
        image={props.image}
        date={props.date}
        dateFormat={props.dateFormat}
      >
        <p className={css(styles.primary)}>
          <Link to={props.path}>{props.title}</Link>
          {authors.length > 0 ? (
            <>
              &nbsp;by <MemberList members={authors} />
            </>
          ) : null}
        </p>
        <p className={css(styles.secondary)}>{props.excerpt}</p>
      </FeedEntry>
    </Spacing>
  )
})
