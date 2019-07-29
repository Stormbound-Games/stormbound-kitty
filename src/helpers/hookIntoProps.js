import React from 'react'

const hookIntoProps = useHooks => Component => {
  const HooksProvider = props =>
    React.createElement(Component, { ...props, ...useHooks(props) })

  return HooksProvider
}

export default hookIntoProps
