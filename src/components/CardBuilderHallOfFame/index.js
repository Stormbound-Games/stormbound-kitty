import React from 'react'
import { WEEKLY_CARD_CONTEST } from '../../constants/misc'
import CardContestEntry from '../CardContestEntry'
import Title from '../Title'

export default React.memo(function CardBuilderHallOfFame(props) {
  return (
    <div className='CardBuilderHallOfFame'>
      <Title>Hall of Fame</Title>

      {WEEKLY_CARD_CONTEST.filter(contest => !!contest.winner)
        .reverse()
        .map((contest, index) => (
          <CardContestEntry {...contest} index={index} />
        ))}
    </div>
  )
})
