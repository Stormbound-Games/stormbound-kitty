import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import Icon from '~/components/Icon'
import useUser from '~/hooks/useUser'
import styles from './styles'

export default React.memo(function MemberListEntry(props) {
  const [currentUser] = useUser()
  const isCurrentUser = currentUser ? props.name === currentUser.name : false
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
          {props.contributions}{' '}
          {props.contributions === 1 ? 'contribution' : 'contributions'}
        </p>
      </div>
    </div>
  )
})
