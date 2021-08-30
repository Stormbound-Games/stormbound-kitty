import React from 'react'
import { useFela } from 'react-fela'
import Only from '~/components/Only'
import useSpacing from '~/hooks/useSpacing'
import styles from './styles'

const RowContext = React.createContext({
  withNarrowGutter: false,
  isDesktopOnly: false,
})

const Row = React.memo(function Row(props) {
  const { css } = useFela({
    isDesktopOnly: props.isDesktopOnly,
    withNarrowGutter: props.withNarrowGutter,
  })
  const margin = useSpacing(
    props.spacing || { bottom: [props.isDesktopOnly ? 'NONE' : 'BASE', 'BASE'] }
  )

  return (
    <div
      className={css(margin, styles.row, props.extend)}
      data-testid={props['data-testid']}
    >
      <RowContext.Provider
        value={{
          isDesktopOnly: props.isDesktopOnly,
          withNarrowGutter: props.withNarrowGutter,
        }}
      >
        {props.children}
      </RowContext.Provider>
    </div>
  )
})

Row.Column = React.memo(function Column(props) {
  const { isDesktopOnly, withNarrowGutter } = React.useContext(RowContext)
  const [spread, columns] = (props.width || '1/2').split('/').map(Number)
  const { css } = useFela({
    isDesktopOnly,
    withNarrowGutter,
    align: props.align,
  })
  const margin = useSpacing(
    props.spacing || { bottom: [isDesktopOnly ? 'BASE' : 'NONE', 'NONE'] }
  )

  return (
    <div
      className={css(styles.column, margin, props.extend)}
      style={{ '--columns': columns, '--spread': spread }}
    >
      <RowContext.Provider
        value={{ isDesktopOnly: false, withNarrowGutter: false }}
      >
        {props.children}
      </RowContext.Provider>
    </div>
  )
})

const ALLOWED_CHILDREN_TYPES = {
  'Row.Column': Row.Column,
  'Only.Desktop': Only.Desktop,
  'Only.Mobile': Only.Mobile,
  'React.Fragment': React.Fragment,
}

Row.propTypes = {
  children: function (props, propName, componentName) {
    let error = null
    const names = Object.keys(ALLOWED_CHILDREN_TYPES)
    const components = Object.values(ALLOWED_CHILDREN_TYPES)

    React.Children.forEach(props[propName], function (child) {
      if (components.every(type => child.type !== type)) {
        error = new Error(
          `Children of ${componentName} should be of types ${names.join(', ')}.`
        )
      }
    })

    return error
  },
}

export default Row
