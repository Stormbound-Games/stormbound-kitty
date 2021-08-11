import React from 'react'
import { useFela } from 'react-fela'
import { PageContext } from '../Page'
import styles from './styles'

export default React.memo(function Title(props) {
  const { isEditorialContent } = React.useContext(PageContext)
  const Element = props.element || 'h2'
  const { css } = useFela({ isEditorialContent })

  return (
    <Element
      className={css(styles.title, props.extend)}
      data-testid={props['data-testid']}
      id={props.id}
      aria-hidden={props['aria-hidden']}
    >
      <span className={css(styles.inner)}>
        <span className={css(styles.content)}>{props.children}</span>
      </span>
    </Element>
  )
})
