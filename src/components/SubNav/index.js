import React from 'react'
import { useFela } from 'react-fela'
import Link from '~/components/Link'
import styles from './styles'

export default React.memo(function SubNav(props) {
  const { css } = useFela()

  return (
    <nav className={css(styles.nav)}>
      <ul className={css(styles.list)}>
        {props.items.map(item => (
          <li className={css(styles.item)} key={item.label}>
            {item.type === 'COMPONENT' ? (
              <div className={css({ padding: '1em', textAlign: 'left' })}>
                {item.children}
              </div>
            ) : item.to ? (
              <Link to={item.to} extend={styles.action(item)}>
                {item.label}
              </Link>
            ) : (
              <span
                className={css(styles.action({ isDisabled: true }))}
                title={item.hint}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
})
