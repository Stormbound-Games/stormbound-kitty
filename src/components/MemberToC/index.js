import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import groupBy from '~/helpers/groupBy'
import styles from './styles'

export default React.memo(function MemberToC(props) {
  const { css } = useFela()
  const content = React.useMemo(
    () => groupBy(props.feed, '_type'),
    [props.feed]
  )
  const stories = content.story || []
  const guides = content.guide || []
  const decks = content.deck || []
  const tournaments = content.tournament || []
  const podiums = content.podium || []
  const swcc = content.SWCC || []
  const artworks = content.artwork || []
  const puzzles = content.puzzle || []
  const podcasts = content.podcast || []
  const events = content.event || []
  const donations = content.donation || []
  const releases = content.release || []
  const contributions = (content.contributions || []).reduce(
    (acc, { entries }) => acc.concat(entries),
    []
  )

  return (
    <ul className={css(styles.toc)}>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='quill' /> {stories.length}{' '}
        {stories.length === 1 ? 'story' : 'stories'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='compass' /> {guides.length}{' '}
        {guides.length === 1 ? 'guide' : 'guides'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='stack' /> {decks.length}{' '}
        {decks.length === 1 ? 'deck' : 'decks'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='users' /> {tournaments.length} hosted{' '}
        {tournaments.length === 1 ? 'tournament' : 'tournaments'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='trophy' /> {podiums.length}{' '}
        {podiums.length === 1 ? 'podium' : 'podiums'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='hammer' /> {swcc.length} won{' '}
        {swcc.length === 1 ? 'card contest' : 'card contests'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='image' /> {artworks.length}{' '}
        {artworks.length === 1 ? 'artwork' : 'artworks'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='sword' /> {puzzles.length}{' '}
        {puzzles.length === 1 ? 'puzzle' : 'puzzles'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='bubbles' /> {podcasts.length}{' '}
        {podcasts.length === 1 ? 'podcast' : 'podcasts'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='star' /> {events.length} miscellaneous{' '}
        {events.length === 1 ? 'event' : 'events'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='hammer' /> {contributions.length}{' '}
        {contributions.length === 1
          ? 'code contribution'
          : 'code contributions'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='heart' /> {donations.length}{' '}
        {donations.length === 1 ? 'donation' : 'donations'}
      </li>
      {releases.length > 0 && (
        <li className={css(styles.item)}>
          <Icon extend={styles.icon} icon='bullhorn' /> {releases.length}{' '}
          {releases.length === 1 ? 'release' : 'releases'}
        </li>
      )}
    </ul>
  )
})
