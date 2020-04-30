import React from 'react'
import MemberSection from '../MemberSection'
import Stories from '../Stories'
import './index.css'

export default React.memo(function MemberStories(props) {
  if (props.stories.length === 0) return null

  return (
    <MemberSection>
      <Stories stories={props.stories} columns={3} />
    </MemberSection>
  )
})
