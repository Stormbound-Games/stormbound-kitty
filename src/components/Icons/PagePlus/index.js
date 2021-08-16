import React from 'react'

export default React.memo(function PagePlus(props) {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      {...props}
    >
      <path d='M9 10v-2h2v2h2v2h-2v2h-2v-2h-2v-2h2zM4 18h12v-12h-4v-4h-8v16zM2 19v-19h12l4 4v16h-16v-1z'></path>
    </svg>
  )
})
