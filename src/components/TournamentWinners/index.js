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
        The team tournament was won by 🥇{' '}
        <span className='Highlight'>
          <MemberList members={gold} />
        </span>
        {silver ? (
          <>
            , with 🥈{' '}
            <span className='Highlight'>
              <MemberList members={silver} />
            </span>{' '}
            {bronze ? (
              <>
                and 🥉{' '}
                <span className='Highlight'>
                  <MemberList members={bronze} />
                </span>{' '}
              </>
            ) : null}
            as {bronze ? 'respective' : ''} runner-up
            {bronze ? 's' : ''}
          </>
        ) : null}
        .
      </p>
    )
  }

  return (
    <p>
      The tournament was won by 🥇{' '}
      <Link to={'/member/' + gold} extend={{ color: 'var(--beige)' }}>
        {gold}
      </Link>
      {silver ? (
        <>
          , with 🥈{' '}
          <Link to={'/member/' + silver} extend={{ color: 'var(--beige)' }}>
            {silver}
          </Link>{' '}
          {bronze ? (
            <>
              and 🥉{' '}
              <Link to={'/member/' + bronze} extend={{ color: 'var(--beige)' }}>
                {bronze}
              </Link>{' '}
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
