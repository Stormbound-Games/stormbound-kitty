import React from 'react'
import { useFela } from 'react-fela'

export default React.memo(function Strikethrough(props) {
  const { css } = useFela()

  return (
    <s className={css({ textDecoration: 'line-through', opacity: 0.7 })}>
      {props.children}
    </s>
  )
})
