import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const LearnMoreIcon = props => (
  <Link to={'/faq' + (props.anchor || '')} className='LearnMoreIcon'>
    <span className='visually-hidden'>
      {props.children || 'Learn more in the FAQ'}
    </span>
    <span className='LearnMoreIcon__mark'>?</span>
  </Link>
)

export default LearnMoreIcon
