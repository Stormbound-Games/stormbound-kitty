import React from 'react'
import FAQEntry from '~/components/FAQEntry'

export default React.memo(function FAQSection(props) {
  return (
    <dl>
      {props.entries.map(entry => (
        <FAQEntry key={entry.question} {...entry} />
      ))}
    </dl>
  )
})
