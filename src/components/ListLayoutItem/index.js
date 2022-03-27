import React from 'react'
import { useFela } from 'react-fela'
import Spacing from '~/components/Spacing'
import FeedEntry from '~/components/FeedEntry'
import Link from '~/components/Link'
import styles from './styles'

export default React.memo(function ListLayoutItem(props) {
  const { css } = useFela()

  return (
    <Spacing key={props.title} vertical='BASE'>
      <FeedEntry icon={props.icon} date={props.date}>
        <p className={css(styles.primary)}>
          <Link to={props.path}>{props.title}</Link> by{' '}
          <Link to={'/members/' + props.author.slug}>{props.author.name}</Link>
        </p>
        <p className={css(styles.secondary)}>{props.excerpt}</p>
      </FeedEntry>
    </Spacing>
  )
})
