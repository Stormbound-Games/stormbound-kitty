import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Icon from '~/components/Icon'
import { UserContext } from '~/components/UserProvider'
import isKATMember from '~/helpers/isKATMember'
import useMemberContent from '~/hooks/useMemberContent'
import styles from './styles'

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
        <p className={css(styles.summary)}>
          {count} contribution{count === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  )
})
