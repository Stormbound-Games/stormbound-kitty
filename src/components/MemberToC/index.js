import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import styles from './styles'

export default React.memo(function MemberToC(props) {
  const { css } = useFela()
  const codeUpdatesCount = props.updates.reduce(
    (acc, { entries }) => acc + entries.length,
    0
  )

  return (
    <ul className={css(styles.toc)}>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='quill' /> {props.stories.length}{' '}
        {props.stories.length === 1 ? 'story' : 'stories'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='compass' /> {props.guides.length}{' '}
        {props.guides.length === 1 ? 'guide' : 'guides'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='stack' /> {props.decks.length}{' '}
        {props.decks.length === 1 ? 'deck' : 'decks'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='users' /> {props.hosts.length} hosted{' '}
        {props.hosts.length === 1 ? 'tournament' : 'tournaments'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='trophy' /> {props.podiums.length}{' '}
        {props.podiums.length === 1 ? 'podium' : 'podiums'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='hammer' /> {props.cards.length} won{' '}
        {props.cards.length === 1 ? 'card contest' : 'card contests'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='image' /> {props.artworks.length}{' '}
        {props.artworks.length === 1 ? 'artwork' : 'artworks'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='sword' /> {props.puzzles.length}{' '}
        {props.puzzles.length === 1 ? 'puzzle' : 'puzzles'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='bubbles' /> {props.podcasts.length}{' '}
        {props.podcasts.length === 1 ? 'podcast' : 'podcasts'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='star' /> {props.events.length}{' '}
        miscellaneous {props.events.length === 1 ? 'event' : 'events'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='hammer' /> {codeUpdatesCount}{' '}
        {codeUpdatesCount === 1 ? 'code update' : 'code updates'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='heart' /> {props.donations.length}{' '}
        {props.donations.length === 1 ? 'donation' : 'donations'}
      </li>
    </ul>
  )
})
