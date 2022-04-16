import React from 'react'
import { useFela } from 'react-fela'

const styles = {
  color: 'var(--beige)',
  marginLeft: '2px',
  fontSize: '120%',
}

export default React.memo(function Asterisk() {
  const { css } = useFela()

  return <span className={css(styles)}>*</span>
})
