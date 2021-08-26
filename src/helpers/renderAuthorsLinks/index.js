import React from 'react'
import Link from '~/components/Link'

const renderAuthorsLinks = (acc, author, index, authors) => {
  if (authors.length > 1 && index === authors.length - 1) {
    acc.push(' and ')
  } else if (index !== 0) {
    acc.push(', ')
  }

  acc.push(
    <Link to={`/members/${author.toLowerCase()}`} key={author}>
      {author}
    </Link>
  )

  return acc
}

export default renderAuthorsLinks
