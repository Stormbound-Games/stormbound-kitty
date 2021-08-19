import React from 'react'
import { useFela } from 'react-fela'
import CHANGELOG from '~/data/changelog'
import parseDate from '~/helpers/parseDate'
import FeedCardChange from '~/components/FeedCardChange'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function CardChangeFeed(props) {
  const { css } = useFela()
  const changes = CHANGELOG.filter(change => change.id === props.id)
  const hasReleaseChange = changes.some(
    change =>
      change.description === 'Added to the game' ||
      change.description === 'Added in Brawl mode'
  )

  if (!hasReleaseChange) {
    changes.push({
      date: '18/09/2017',
      description: 'Released with the game',
      id: props.id,
      type: 'INFO',
    })
  }

  if (changes.length === 0) return null

  return (
    <>
      <Title>Changes</Title>
      <ul className={css(styles.feed)}>
        {changes
          .map(entry => ({
            ...entry,
            date: parseDate(entry.date),
          }))
          .sort((a, b) => b.date - a.date)
          .map((entry, index) => (
            <li key={index}>
              <Spacing bottom='BASE'>
                <FeedCardChange {...entry} versionId={props.versionId} />
              </Spacing>
            </li>
          ))}
      </ul>
    </>
  )
})
