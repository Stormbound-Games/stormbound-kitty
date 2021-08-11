import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Icon from '../Icon'
import { UserContext } from '../UserProvider'
import isKATMember from '../../helpers/isKATMember'
import useMemberContent from '../../hooks/useMemberContent'
import styles from './styles'

const getLabel = (key, number) => {
  switch (key) {
    case 'stories':
      return number === 1 ? 'story' : 'stories'
    case 'decks':
      return number === 1 ? 'deck' : 'decks'
    case 'guides':
      return number === 1 ? 'guide' : 'guides'
    case 'hosts':
      return number === 1 ? 'hosted tournament' : 'hosted tournaments'
    case 'podiums':
      return number === 1 ? 'podium' : 'podiums'
    case 'artworks':
      return number === 1 ? 'artwork' : 'artworks'
    case 'puzzles':
      return number === 1 ? 'puzzle' : 'puzzles'
    case 'cards':
      return number === 1 ? 'won card contest' : 'won card contests'
    case 'contributions':
      return number === 1 ? 'code update' : 'code updates'
    case 'donations':
      return number === 1 ? 'donation' : 'donations'
    case 'podcasts':
      return number === 1 ? 'podcast' : 'podcasts'
    case 'events':
      return number === 1 ? 'miscellaneous event' : 'miscellaneous events'
    default:
      return null
  }
}

const MemberListEntryToC = React.memo(function MemberListEntryToC(props) {
  const { css } = useFela()
  const keys = Object.keys(props.details)
  const data = keys.reduce((acc, key) => {
    if (props.details[key].length > 0) {
      acc[key] = props.details[key]
    }

    return acc
  }, {})

  return (
    <ul className={css(styles.toc)}>
      {Object.keys(data).map(key => {
        const count = data[key].reduce(
          (acc, entry) => acc + (entry.entries?.length ?? 1),
          0
        )

        return (
          <li key={key}>
            {count} {getLabel(key, count)}
          </li>
        )
      })}
    </ul>
  )
})

export default React.memo(function MemberListEntry(props) {
  const { name } = React.useContext(UserContext)
  const { count, details } = useMemberContent(props.member.toLowerCase())
  const { isKAT, isSuperKAT } = isKATMember(details)
  const isCurrentUser = name === props.member
  const { css } = useFela({ isYou: isCurrentUser })

  return (
    <div className={css(styles.entry)}>
      <Icon
        icon={isSuperKAT ? 'super-star' : isKAT ? 'star' : 'user'}
        extend={styles.icon}
      />
      <div className={css(styles.content)}>
        <Link to={`/member/${props.member}`} extend={styles.name}>
          {props.member}{' '}
          <span className={css({ opacity: 0.6 })}>
            {isCurrentUser ? '(you)' : null}
          </span>
        </Link>
        <details>
          <summary>
            <span className={css(styles.summary)}>
              {count} contribution{count === 1 ? '' : 's'}
            </span>
          </summary>
          <MemberListEntryToC details={details} />
        </details>
      </div>
    </div>
  )
})
