import React from 'react'
import Title from '../Title'
import './index.css'

const MemberSection = React.memo(function MemberSection(props) {
  return (
    <div className='MemberSection'>
      <Title className='MemberSection__title'>{props.title}</Title>
      {props.children}
    </div>
  )
})

export default MemberSection
