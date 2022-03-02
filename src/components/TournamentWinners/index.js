/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import Link from '~/components/Link'
import MemberList from '~/components/MemberList'

export default React.memo(function TournamentWinners(props) {
  const isTeamTournament = props.podium.some(step => step.length > 1)

  if (isTeamTournament) {
    const [gold, silver, bronze] = props.podium
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

  const gold = props.podium[0][0]
  const silver = props.podium[1]?.[0]
  const bronze = props.podium[2]?.[0]

  return (
    <p>
      The tournament was won by 🥇{' '}
      <Link to={'/members/' + gold.slug}>{gold.name}</Link>
      {silver ? (
        <>
          , with 🥈 <Link to={'/members/' + silver.slug}>{silver.name}</Link>{' '}
          {bronze ? (
            <>
              and 🥉 <Link to={'/members/' + bronze.slug}>{bronze.name}</Link>{' '}
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
