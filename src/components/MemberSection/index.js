import React from 'react'
import Title from '../Title'
import './index.css'

const MemberSection = props => (
  <div className='MemberSection'>
    <Title className='MemberSection__title'>{props.title}</Title>
    {props.children}
  </div>
)

export default MemberSection
