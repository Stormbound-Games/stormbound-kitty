import React from 'react'
import Title from '../Title'
import './index.css'

export default React.memo(function MemberSection(props) {
  return (
    <div className='MemberSection'>
      {props.title ? (
        <Title className='MemberSection__title'>{props.title}</Title>
      ) : null}
      {props.children}
    </div>
  )
})
