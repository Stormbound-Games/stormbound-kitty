import React from 'react'
import CardContestEntry from '../CardContestEntry'
import MemberSection from '../MemberSection'

export default React.memo(function MemberContestVictories(props) {
  if (props.victories.length === 0) return null

  return (
    <MemberSection title={<>Contest victories by {props.displayName}</>}>
      {props.victories.map((contest, index) => (
        <CardContestEntry key={index} {...contest} index={index} />
      ))}
    </MemberSection>
  )
})
