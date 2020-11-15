import React from 'react'
import Only from '../Only'
import './index.css'

const RowContext = React.createContext({
  wideGutter: false,
  desktopOnly: false,
})

const Row = React.memo(function Row(props) {
  return (
    <div
      className={[
        'Row',
        props.desktopOnly && 'Row--desktop',
        props.wideGutter && 'Row--wide',
      ]
        .filter(Boolean)
        .join(' ')}
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

  return (
    <div
      className={[
        'Column',
        desktopOnly && 'Column--desktop',
        wideGutter && 'Column--wide',
        Boolean(props.width) && `Column--${props.width}`,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...props.style, alignItems: props.align }}
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
