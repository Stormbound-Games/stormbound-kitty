import React from 'react'
import { useFela } from 'react-fela'
import parseDate from '~/helpers/parseDate'
import FeedCardChange from '~/components/FeedCardChange'
import Spacing from '~/components/Spacing'
import Title from '~/components/Title'
import styles from './styles'

export default React.memo(function CardChangeFeed(props) {
  const { css } = useFela()
  const changes = props.changes.slice(0)
  const currentVersionId = props.versionId
  const hasReleaseChange = changes.some(
    change =>
      change.description === 'Added to the game' ||
      change.description === 'Added in Brawl mode'
  )

  if (!hasReleaseChange) {
    changes.push({
      timestamp: 1505728800000,
      date: '18/09/2017',
      description: 'Released with the game',
      id: props.id,
      type: 'INFO',
    })
  }

  if (changes.length === 0) return null

  return (
    <Spacing vertical='LARGEST'>
      <Title>Official changes</Title>
      <ul className={css(styles.feed)}>
        {changes
          .map(entry => ({
            ...entry,
            date: parseDate(entry.date),
          }))
          .map((entry, index, array) => {
            const previousEntry = array[index - 1]
            const previewVersionId = previousEntry?.timestamp
            const isCurrentlyPreviewed = currentVersionId
              ? previewVersionId === currentVersionId
              : index === 0

            return (
              <li key={index} className={css(styles.item)}>
                <Spacing bottom='BASE'>
                  <FeedCardChange
                    {...entry}
                    isCurrentlyPreviewed={isCurrentlyPreviewed}
                    previewVersionId={previewVersionId}
                    currentVersionId={currentVersionId}
                    withVersioning
                  />
                </Spacing>
              </li>
            )
          })}
      </ul>
    </Spacing>
  )
})
