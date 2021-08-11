import React from 'react'
import Title from '../Title'
import FAQEntry from '../FAQEntry'

export default React.memo(function FAQSection(props) {
  return (
    <>
      <Title>{props.title}</Title>
      <dl>
        {props.entries.map(entry => (
          <FAQEntry key={entry.id} {...entry} />
        ))}
      </dl>
    </>
  )
})
