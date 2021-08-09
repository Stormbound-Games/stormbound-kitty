import React from 'react'
import { useFela } from 'react-fela'
import Only from '../Only'
import styles from './styles'

const RowContext = React.createContext({
  wideGutter: false,
  desktopOnly: false,
})

const Row = React.memo(function Row(props) {
  const { css } = useFela({
    isWide: props.wideGutter,
    isDesktop: props.desktopOnly,
  })

  return (
    <div
      className={css(styles.row, props.extend)}
      data-testid={props['data-testid']}
    >
      <RowContext.Provider
        value={{ wideGutter: props.wideGutter, desktopOnly: props.desktopOnly }}
      >
        {props.children}
      </RowContext.Provider>
    </div>
  )
})

Row.Column = React.memo(function Column(props) {
  const { wideGutter, desktopOnly } = React.useContext(RowContext)
  const [spread, columns] = (props.width || '1/2').split('/').map(Number)
  const { css } = useFela({
    isWide: wideGutter,
    isDesktop: desktopOnly,
  })

  return (
    <div
      className={css(styles.column, { alignItems: props.align }, props.extend)}
      style={{
        '--columns': columns,
        '--spread': spread,
      }}
    >
      <RowContext.Provider value={{ wideGutter: false, desktopOnly: false }}>
        {props.children}
      </RowContext.Provider>
    </div>
  )
})

const ALLOWED_CHILDREN_TYPES = {
  'Row.Column': Row.Column,
  'Only.Desktop': Only.Desktop,
  'Only.Mobile': Only.Mobile,
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
