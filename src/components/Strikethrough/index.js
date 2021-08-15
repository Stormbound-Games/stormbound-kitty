import React from 'react'
import { useFela } from 'react-fela'

const styles = { textDecoration: 'line-through', opacity: 0.7 }

export default React.memo(function Strikethrough(props) {
  const { css } = useFela()

  return <s className={css(styles)}>{props.children}</s>
})
