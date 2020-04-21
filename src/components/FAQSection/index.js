import React from 'react'
import Title from '../Title'
import FAQEntry from '../FAQEntry'
import './index.css'

const FAQSection = props => (
  <section className='FAQSection' id={props.id}>
    <Title>{props.title}</Title>
    <dl className='FAQSection__list'>
      {props.entries.map(entry => (
        <FAQEntry key={entry.id} {...entry} />
      ))}
    </dl>
  </section>
)

export default FAQSection
