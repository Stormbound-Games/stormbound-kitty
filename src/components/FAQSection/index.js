import React from 'react'
import { useFela } from 'react-fela'
import Title from '../Title'
import FAQEntry from '../FAQEntry'

export default React.memo(function FAQSection(props) {
  const { css } = useFela()
  return (
    <section className={css({ marginBottom: '2em' })} id={props.id}>
      <Title>{props.title}</Title>
      <dl className='FAQSection__list'>
        {props.entries.map(entry => (
          <FAQEntry key={entry.id} {...entry} />
        ))}
      </dl>
    </section>
  )
})
