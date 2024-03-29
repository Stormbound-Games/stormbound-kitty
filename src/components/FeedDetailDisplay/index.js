import React from 'react'
import { useFela } from 'react-fela'
import Spacing from '#components/Spacing'

export default React.memo(function FeedDetailDisplay(props) {
  const { css } = useFela()

  return (
    <details className={css({ maxWidth: '450px' })}>
      <summary>+ Toggle {props.label} display</summary>
      <Spacing top='BASE'>{props.children}</Spacing>
    </details>
  )
})
