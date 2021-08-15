/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import Link from '../Link'
import MemberList from '../MemberList'

export default React.memo(function TournamentWinners(props) {
  const isTeamTournament = props.podium.every(entry => Array.isArray(entry))
  const [gold, silver, bronze] = props.podium

  if (isTeamTournament) {
    return (
      <p>
        The team tournament was won by 🥇&nbsp;
        <MemberList members={gold} />
        {silver ? (
          <>
            , with 🥈&nbsp;
            <MemberList members={silver} />
            {bronze ? (
              <>
                {' '}
                and 🥉&nbsp;
                <MemberList members={bronze} />
              </>
            ) : null}{' '}
            as {bronze ? 'respective runner-ups' : 'runner-up'}
          </>
        ) : null}
        .
      </p>
    )
  }

  return (
    <p>
      The tournament was won by 🥇 <Link to={'/member/' + gold}>{gold}</Link>
      {silver ? (
        <>
          , with 🥈 <Link to={'/member/' + silver}>{silver}</Link>{' '}
          {bronze ? (
            <>
              and 🥉 <Link to={'/member/' + bronze}>{bronze}</Link>{' '}
            </>
          ) : null}
          as {bronze ? 'respective' : ''} runner-up
          {bronze ? 's' : ''}
        </>
      ) : null}
      .
    </p>
  )
})
