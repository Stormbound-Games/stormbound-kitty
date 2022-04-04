import React from 'react'
import PoweredBy from '~/components/PoweredBy'

export default React.memo(function PoweredByVercel(props) {
  return (
    <PoweredBy
      name='Vercel'
      href='https://vercel.com/?utm_source=stormbound&utm_campaign=oss'
    >
      <svg
        width='512'
        height='512'
        viewBox='0 0 512 512'
        xmlns='http://www.w3.org/2000/svg'
        fill='white'
        focusable='false'
      >
        <path fillRule='evenodd' d='M256,48,496,464H16Z' />
      </svg>
    </PoweredBy>
  )
})
