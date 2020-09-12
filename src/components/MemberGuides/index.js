import React from 'react'
import Column from '../Column'
import GuideTeaser from '../GuideTeaser'
import MemberSection from '../MemberSection'
import Row from '../Row'
import chunk from '../../helpers/chunk'

export default React.memo(function MemberGuides(props) {
  if (props.guides.length === 0) return null

  return (
    <MemberSection title='Guides'>
      {chunk(props.guides, 3).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          <Column width='1/3'>{row[0] && <GuideTeaser {...row[0]} />}</Column>
          <Column width='1/3'>{row[1] && <GuideTeaser {...row[1]} />}</Column>
          <Column width='1/3'>{row[2] && <GuideTeaser {...row[2]} />}</Column>
        </Row>
      ))}
    </MemberSection>
  )
})
