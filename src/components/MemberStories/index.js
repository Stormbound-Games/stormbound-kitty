import React from 'react'
import MemberSection from '../MemberSection'
import Stories from '../Stories'

export default React.memo(function MemberStories(props) {
  if (props.stories.length === 0) return null

  return (
    <MemberSection title='Stories'>
      <Stories stories={props.stories} columns={3} />
    </MemberSection>
  )
})
