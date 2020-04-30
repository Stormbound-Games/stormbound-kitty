import React from 'react'
import MemberSection from '../MemberSection'
import HeaderBanner from '../HeaderBanner'
import Stories from '../Stories'
import './index.css'

export default React.memo(function MemberStories(props) {
  if (props.stories.length === 0) return null

  return (
    <MemberSection>
      <HeaderBanner title={props.displayName} />

      <Stories stories={props.stories} columns={3} />
    </MemberSection>
  )
})
