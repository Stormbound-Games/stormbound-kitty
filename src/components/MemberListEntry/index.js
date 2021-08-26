import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Icon from '~/components/Icon'
import { UserContext } from '~/components/UserProvider'
import styles from './styles'

export default React.memo(function MemberListEntry(props) {
  const { member, count, roles } = props
  const { name } = React.useContext(UserContext)
  const isCurrentUser = name === member
  const { css } = useFela({ isYou: isCurrentUser })

  return (
    <div className={css(styles.entry)}>
      <Icon
        icon={roles.isSuperKAT ? 'super-star' : roles.isKAT ? 'star' : 'user'}
        extend={styles.icon}
      />
      <div className={css(styles.content)}>
        <Link
          to={`/members/${props.member.toLowerCase()}`}
          extend={styles.name}
        >
          {props.member}{' '}
          <span className={css({ opacity: 0.6 })}>
            {isCurrentUser ? '(you)' : null}
          </span>
        </Link>
        <p className={css(styles.summary)}>
          {count} contribution{count === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  )
})
