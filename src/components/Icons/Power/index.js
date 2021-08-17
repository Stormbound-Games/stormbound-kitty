import React from 'react'

export default React.memo(function Power(props) {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      {...props}
    >
      <path d='M12 0l-12 16h12l-8 16 28-20h-16l12-12z'></path>
    </svg>
  )
})
