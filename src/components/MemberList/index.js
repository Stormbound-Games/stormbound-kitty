import React from 'react'
import Link from '~/components/Link'

export default React.memo(function MemberList(props) {
  return props.members.reduce((acc, user, index, arr) => {
    const name = typeof user === 'string' ? user : user.name
    const slug = typeof user === 'string' ? user.toLowerCase() : user.slug

    return (
      <>
        {acc}
        {index === 0 ? '' : index === arr.length - 1 ? ' and' : ','}{' '}
        <Link to={'/members/' + slug}>{name}</Link>
      </>
    )
  }, <></>)
})
