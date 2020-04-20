import React from 'react'
import CardContestEntry from '../CardContestEntry'
import MemberSection from '../MemberSection'

const MemberContestVictories = props => {
  if (props.victories.length === 0) return null

  return (
    <MemberSection title={<>Card contest victories by {props.displayName}</>}>
      {props.victories.map((contest, index) => (
        <CardContestEntry key={index} {...contest} index={index} />
      ))}
    </MemberSection>
  )
}

export default MemberContestVictories
