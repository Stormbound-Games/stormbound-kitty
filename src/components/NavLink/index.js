import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import styles from '../Header/styles'

export default React.memo(
  ({
    active,
    children,
    to,
    href,
    onClick,
    target,
    rel,
    disabled,
    isWithinSubList,
  }) => {
    const { css } = useFela()

    return onClick ? (
      <button
        onClick={onClick}
        disabled={disabled}
        children={children}
        className={css(
          styles.action({ isDisabled: disabled, isWithinSubList })
        )}
      />
    ) : to ? (
      <Link
        to={to}
        children={children}
        className={css(styles.action({ isActive: active, isWithinSubList }))}
      />
    ) : (
      <a
        href={href}
        target={target}
        rel={rel}
        children={children}
        className={css(styles.action({ isWithinSubList }))}
      />
    )
  }
)
