import React from 'react'
import { useFela } from 'react-fela'
import CardFeedItem from '~/components/CardFeedItem'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function CardCommunityFeed(props) {
  const { css } = useFela()

  return (
    <>
      <Title>Community feed</Title>
      <ul className={css(styles.feed)}>
        {props.feed.map((item, index) => (
          <li
            key={index}
            className={css({
              marginBottom: 'var(--s-large)',
            })}
          >
            <CardFeedItem {...item} />
          </li>
        ))}
      </ul>
    </>
  )
})
