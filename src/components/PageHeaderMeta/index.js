import React from 'react'
import { useFela } from 'react-fela'
import Icon from '~/components/Icon'
import Link from '~/components/Link'
import MemberList from '~/components/MemberList'
import styles from './styles'

export default React.memo(function PageHeaderMeta({ action, authors, meta }) {
  const { css } = useFela()

  return (
    <p className={css(styles.meta)}>
      {authors.length > 0 && (
        <span>
          By&nbsp;
          <MemberList members={authors} />
          {meta && <>&nbsp;·&nbsp;</>}
        </span>
      )}

      {meta && <span data-testid='page-meta'>{meta}</span>}

      {Object.keys(action).length > 0 &&
        (action.onClick ? (
          <Link
            onClick={action.onClick}
            disabled={action.disabled}
            extend={styles.action}
            data-testid='page-meta-action'
          >
            {action.icon && (
              <Icon icon={action.icon} extend={styles.actionIcon} />
            )}
            <span>{action.children}</span>
          </Link>
        ) : (
          <Link
            to={action.to}
            href={action.href}
            extend={styles.action}
            hideNewTabIndicator
            data-testid='page-meta-action'
          >
            {action.to && action.icon !== 'arrow-right' && (
              <Icon
                icon={action.icon || 'arrow-left'}
                extend={styles.actionIcon}
              />
            )}
            <span>{action.children}</span>
            {(action.href || action.icon === 'arrow-right') && (
              <Icon
                icon={
                  action.icon ||
                  (action.href ? 'arrow-top-right' : 'arrow-right')
                }
                extend={styles.actionIcon}
              />
            )}
          </Link>
        ))}
    </p>
  )
})
