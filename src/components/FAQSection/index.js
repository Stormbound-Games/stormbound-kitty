import React from 'react'
import Title from '../Title'
import FAQEntry from '../FAQEntry'
import './index.css'

export default React.memo(function FAQSection(props) {
  return (
    <section className='FAQSection' id={props.id}>
      <Title>{props.title}</Title>
      <dl className='FAQSection__list'>
        {props.entries.map(entry => (
          <FAQEntry key={entry.id} {...entry} />
        ))}
      </dl>
    </section>
  )
})
