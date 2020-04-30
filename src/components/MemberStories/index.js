import React from 'react'
import Column from '../Column'
import MemberSection from '../MemberSection'
import Row from '../Row'
import StoriesHeader from '../StoriesHeader'
import StoryTeaser from '../StoryTeaser'
import chunk from '../../helpers/chunk'
import './index.css'

export default React.memo(function MemberStories(props) {
  if (props.stories.length === 0) return null

  return (
    <MemberSection>
      <StoriesHeader background='/assets/images/environment_neutral.png'>
        {props.displayName}
      </StoriesHeader>
      {chunk(props.stories, 3).map((row, index) => {
        return (
          <Row key={index} wideGutter desktopOnly>
            <Column width='1/3'>{row[0] && <StoryTeaser {...row[0]} />}</Column>
            <Column width='1/3'>{row[1] && <StoryTeaser {...row[1]} />}</Column>
            <Column width='1/3'>{row[2] && <StoryTeaser {...row[2]} />}</Column>
          </Row>
        )
      })}
    </MemberSection>
  )
})
