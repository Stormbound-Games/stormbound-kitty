import React from 'react'
import changelog from '../../data/changelog'
import parseDate from '../../helpers/parseDate'
import FeedCardChange from '../FeedCardChange'
import Title from '../Title'
import './index.css'

export default React.memo(function CardChangeFeed(props) {
  const changes = changelog.filter(change => change.id === props.id)
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
      <ul className='CardChangeFeed'>
        {changes
          .map(entry => ({
            ...entry,
            date: parseDate(entry.date),
          }))
          .sort((a, b) => b.date - a.date)
          .map((entry, index) => (
            <li key={index} className='CardChangeFeed__item'>
              <FeedCardChange
                {...entry}
                versionId={props.versionId}
                setVersionId={props.setVersionId}
              />
            </li>
          ))}
      </ul>
    </>
  )
})
