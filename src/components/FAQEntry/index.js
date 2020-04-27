import React from 'react'
import './index.css'

export default React.memo(function FAQEntry(props) {
  return (
    <>
      <dt className='FAQEntry' id={props.id}>
        <a className='FAQEntry__link' href={'#' + props.id}>
          {props.question}
        </a>
      </dt>
      <dd className='FAQEntry__answer'>{props.answer}</dd>
    </>
  )
})
