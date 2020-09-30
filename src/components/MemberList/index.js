import React from 'react'
import { Link } from 'react-router-dom'

export default React.memo(function MemberList(props) {
  return props.members.reduce(
    (acc, author, index, arr) => (
      <>
        {acc}
        {index === 0 ? '' : index === arr.length - 1 ? ' and' : ','}{' '}
        <Link to={'/member/' + author}>{author}</Link>
      </>
    ),
    <></>
  )
})
