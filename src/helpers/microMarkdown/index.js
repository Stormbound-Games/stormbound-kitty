import React from 'react'

export default string => {
  if (typeof string !== 'string') {
    return string
  }

  // Assume hyphens are used to author numeric ranges, and therefore prevent
  // line-breaks from happening before/after the hyphen by using a non-breaking
  // hyphen.
  // See: https://unicode-table.com/en/2011/
  string = string.replace(/-/g, '‑')

  const bolds = string.match(/\*[^*]+\*/g)
  let result = []
  let currentIndex = 0

  if (!bolds) {
    return string
  }

  bolds.forEach((bold, index) => {
    // Get the index in the string where the segment starts (ignoring everything
    // before the currently recorded position so if a same word is bolded twice,
    // we deal with the correct occurrence each time)
    const strIndex = string.indexOf(bold, currentIndex)

    // Push anything from the end of the last segment until the beginning of
    // this one into the result
    result.push(string.slice(currentIndex, strIndex))
    // Push a strong tag that contains the segment in the result
    result.push(<strong key={index}>{bold.replace(/\*/g, '')}</strong>)

    // Move the pointer of the end of this segment
    currentIndex = strIndex + bold.length

    // If this is the last segment, push the rest of the string
    if (index === bolds.length - 1) {
      result.push(string.slice(currentIndex))
    }
  })

  return result
}
