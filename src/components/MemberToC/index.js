import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import styles from './styles'

export default React.memo(function MemberToC(props) {
  const { css } = useFela()
  const codeContributions = props.contribution.reduce(
    (acc, { entries }) => acc + entries.length,
    0
  )

  return (
    <ul className={css(styles.toc)}>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='quill' /> {props.story.length}{' '}
        {props.story.length === 1 ? 'story' : 'stories'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='compass' /> {props.guide.length}{' '}
        {props.guide.length === 1 ? 'guide' : 'guides'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='stack' /> {props.deck.length}{' '}
        {props.deck.length === 1 ? 'deck' : 'decks'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='users' /> {props.tournament.length}{' '}
        hosted {props.tournament.length === 1 ? 'tournament' : 'tournaments'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='trophy' /> {props.podium.length}{' '}
        {props.podium.length === 1 ? 'podium' : 'podiums'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='hammer' /> {props.swcc.length} won{' '}
        {props.swcc.length === 1 ? 'card contest' : 'card contests'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='image' /> {props.artwork.length}{' '}
        {props.artwork.length === 1 ? 'artwork' : 'artworks'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='sword' /> {props.puzzle.length}{' '}
        {props.puzzle.length === 1 ? 'puzzle' : 'puzzles'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='bubbles' /> {props.podcast.length}{' '}
        {props.podcast.length === 1 ? 'podcast' : 'podcasts'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='star' /> {props.event.length}{' '}
        miscellaneous {props.event.length === 1 ? 'event' : 'events'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='hammer' /> {codeContributions}{' '}
        {codeContributions === 1 ? 'code contribution' : 'code contributions'}
      </li>
      <li className={css(styles.item)}>
        <Icon extend={styles.icon} icon='heart' /> {props.donation.length}{' '}
        {props.donation.length === 1 ? 'donation' : 'donations'}
      </li>
    </ul>
  )
})
