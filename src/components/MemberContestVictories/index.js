import React from 'react'
import MemberSection from '../MemberSection'
import { CardBuilderHallOfFameSeason } from '../CardBuilderHallOfFame'

export default React.memo(function MemberContestVictories(props) {
  if (props.victories.length === 0) return null

  return (
    <MemberSection title='Contest Victories'>
      <CardBuilderHallOfFameSeason weeks={props.victories} />
    </MemberSection>
  )
})
