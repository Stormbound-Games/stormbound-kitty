import React from 'react'
import replaceInString from '~/helpers/replaceInString'

const microMarkdown = string => {
  if (typeof string !== 'string') {
    return string
  }

  // Assume hyphens are used to author numeric ranges, and therefore prevent
  // line-breaks from happening before/after the hyphen by using a non-breaking
  // hyphen.
  // See: https://unicode-table.com/en/2011/
  string = string.replace(/-/g, '‑')

  return replaceInString(string, /\*([^*]+)\*/g, (match, index) => (
    <strong key={match + index}>{match}</strong>
  ))
}

export default microMarkdown
