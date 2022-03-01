import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Icon from '~/components/Icon'
import useMemberName from '~/hooks/useMemberName'
import styles from './styles'

const getLabel = (count, type) => {
  switch (type) {
    case 'ARTWORK':
      return count === 1 ? 'artwork' : 'artworks'
    case 'CONTEST':
      return count === 1 ? 'card contest' : 'Card Contests'
    case 'DECK':
      return count === 1 ? 'deck' : 'Decks'
    case 'DONATION':
      return count === 1 ? 'donation' : 'donations'
    case 'EVENT':
      return count === 1 ? 'event' : 'events'
    case 'GUIDE':
      return count === 1 ? 'guide' : 'guides'
    case 'HOST':
      return count === 1 ? 'hosted tournament' : 'hosted tournaments'
    case 'PODIUM':
      return count === 1 ? 'podium' : 'podiums'
    case 'PUZZLE':
      return count === 1 ? 'puzzle' : 'puzzles'
    case 'STORY':
      return count === 1 ? 'story' : 'stories'
    case 'CONTRIBUTION':
      return count === 1 ? 'code contribution' : 'code contributions'
    case '*':
    default:
      return count === 1 ? 'contribution' : 'contributions'
  }
}

export default React.memo(function MemberListEntry(props) {
  const [currentName] = useMemberName()
  const isCurrentUser = props.name === currentName
  const { css } = useFela({ isYou: isCurrentUser })

  return (
    <div className={css(styles.entry)}>
      <Icon
        icon={
          props.role === 'SUPER_KAT'
            ? 'super-star'
            : props.role === 'KAT'
            ? 'star'
            : 'user'
        }
        extend={styles.icon}
      />
      <div className={css(styles.content)}>
        <Link to={`/members/${props.slug}`} extend={styles.name}>
          {props.name}{' '}
          <span className={css({ opacity: 0.6 })}>
            {isCurrentUser ? '(you)' : null}
          </span>
        </Link>
        <p className={css(styles.summary)}>
          {props.contributions} {getLabel(props.contributions, props.type)}
        </p>
      </div>
    </div>
  )
})
