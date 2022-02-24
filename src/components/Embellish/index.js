import React from 'react'
import iconify from '~/helpers/iconify'

export default React.memo(function Embellish(props) {
  const Component = props.as || React.Fragment

  return <Component>{iconify(props.children)}</Component>
})
