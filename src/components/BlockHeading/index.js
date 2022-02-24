import React from 'react'
import speakingurl from 'speakingurl'
import getChildrenText from '~/helpers/getChildrenText'

const asHeading = Component =>
  function Heading(props) {
    if (!props.children) return null

    const text = getChildrenText(props)
    const id = speakingurl(text)

    return <Component id={id}>{props.children}</Component>
  }

export default asHeading
