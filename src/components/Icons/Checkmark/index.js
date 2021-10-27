import React from 'react'

export default React.memo(function Checkmark(props) {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      {...props}
    >
      <path d='M27 4l-15 15-7-7-5 5 12 12 20-20z'></path>
    </svg>
  )
})
