import React from 'react'
import { useFela } from 'react-fela'
import CardFeedItem from '~/components/CardFeedItem'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function CardCommunityFeed(props) {
  const { css } = useFela()

  if (!props.feed || props.feed.length === 0) {
    return null
  }

  return (
    <Spacing vertical='LARGEST'>
      <Title>Community feed</Title>
      <ul className={css(styles.feed)}>
        {props.feed.map((item, index) => (
          <li key={index} className={css(styles.item)}>
            <CardFeedItem {...item} />
          </li>
        ))}
      </ul>
    </Spacing>
  )
})
