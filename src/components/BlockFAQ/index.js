import React from 'react'
import FAQSection from '~/components/FAQSection'

export default React.memo(function BlockFAQ(props) {
  return <FAQSection id='faq' title='FAQ' entries={props.value.entries} />
})
