import React from 'react'
import speakingurl from 'speakingurl'

export const getText = props =>
  props.children
    .map(node => (typeof node === 'string' ? node : node.text || ''))
    .join('')

export const findHeadings = (ast, deep = false) =>
  ast.reduce((acc, node) => {
    if (node.style === 'h2') {
      const text = getText(node)
      const id = speakingurl(text)
      acc.push({ _key: node._key, text, id, subtitles: [] })
    } else if (deep && node.style === 'h3' && acc.length) {
      const parent = acc.pop()
      const text = getText(node)
      const id = speakingurl(text)
      parent.subtitles.push({ _key: node._key, text, id })
      acc.push(parent)
    } else if (node.children) {
      acc.push(...findHeadings(node.children))
    }

    return acc
  }, [])

const asHeading = Component =>
  function Heading(props) {
    if (!props.children) return null

    const text = getText(props)
    const id = speakingurl(text)

    return <Component id={id}>{props.children}</Component>
  }

export default asHeading
