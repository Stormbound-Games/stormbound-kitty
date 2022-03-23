import React from 'react'
import FAQEntry from '~/components/FAQEntry'

export default React.memo(function BlockFAQ(props) {
  const entries = props.value.entries || []

  if (entries.length === 0) return null

  return (
    <dl>
      {entries.map(entry => (
        <FAQEntry key={entry.question} {...entry} />
      ))}
    </dl>
  )
})
