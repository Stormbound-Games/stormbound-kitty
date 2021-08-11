import React from 'react'
import { useFela } from 'react-fela'

const Asterisk = props => {
  const { css } = useFela()

  return (
    <span
      className={css({
        color: 'var(--beige)',
        marginLeft: '2px',
        fontSize: '120%',
      })}
    >
      *
    </span>
  )
}

export default React.memo(Asterisk)
