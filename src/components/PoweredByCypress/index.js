import React from 'react'
import PoweredBy from '~/components/PoweredBy'

export default React.memo(function PoweredByCypress(props) {
  return (
    <PoweredBy
      name='Cypress'
      href='https://cypress.io'
      title='Cypress is a fast, easy and reliable testing solution for anything that runs in a browser'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        x='0px'
        y='0px'
        viewBox='0 0 72 72'
        style={{ enableBackground: 'new 0 0 72 72' }}
        focusable='false'
      >
        <path
          fill='#4A4A4D'
          stroke='#FFFFFF'
          d='M35.5,9C50.7,9,63,21.3,63,36.5S50.7,64,35.5,64C20.3,64,8,51.7,8,36.5S20.3,9,35.5,9L35.5,9z'
        />
        <path
          fill='#FFFFFF'
          d='M50.1,48.6c-1,3.1-2.5,5.4-4.6,7.1c-2.1,1.7-4.9,2.6-8.4,2.9l-0.7-4.6c2.3-0.3,4-0.8,5.1-1.6
	c0.4-0.3,1.2-1.2,1.2-1.2l0,0l-8.3-26.6h6.9l4.8,19.9l5.1-19.9h6.7L50.1,48.6L50.1,48.6z'
        />
        <path
          fill='#FFFFFF'
          d='M26,23.7c1.6,0,3.1,0.2,4.3,0.7c1.3,0.5,2.5,1.2,3.7,2.2l-2.8,3.8c-0.8-0.6-1.6-1-2.3-1.3
	c-0.7-0.3-1.6-0.4-2.4-0.4c-3.4,0-5.1,2.6-5.1,7.9c0,2.7,0.4,4.6,1.3,5.7c0.9,1.2,2.1,1.7,3.8,1.7c0.8,0,1.6-0.1,2.3-0.4
	c0.7-0.3,1.5-0.7,2.5-1.3l2.8,4c-2.3,1.9-4.9,2.8-7.9,2.8c-2.4,0-4.4-0.5-6.2-1.5c-1.7-1-3.1-2.5-4-4.4c-0.9-1.9-1.4-4.1-1.4-6.7
	c0-2.5,0.5-4.8,1.4-6.7c0.9-2,2.3-3.5,4-4.6C21.7,24.3,23.7,23.7,26,23.7L26,23.7z'
        />
      </svg>
    </PoweredBy>
  )
})
