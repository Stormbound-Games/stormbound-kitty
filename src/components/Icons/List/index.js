import React from 'react'

export default React.memo(function List(props) {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='32'
      viewBox='0 0 34 32'
      {...props}
    >
      <path d='M0 0h8v8h-8zM12 2h20v4h-20zM0 12h8v8h-8zM12 14h20v4h-20zM0 24h8v8h-8zM12 26h20v4h-20z'></path>
    </svg>
  )
})
