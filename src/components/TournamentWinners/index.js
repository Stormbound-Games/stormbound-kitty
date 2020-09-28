/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import toSentence from '../../helpers/toSentence'

export default React.memo(function TournamentWinners(props) {
  const isTeamTournament = props.podium.every(entry => Array.isArray(entry))
  const [gold, silver, bronze] = props.podium

  if (isTeamTournament) {
    return (
      <p>
        The team tournament was won by 🥇{' '}
        <span className='Highlight'>{toSentence(gold, 'and')}</span>
        {silver ? (
          <>
            , with 🥈{' '}
            <span className='Highlight'>{toSentence(silver, 'and')}</span>{' '}
            {bronze ? (
              <>
                and 🥉{' '}
                <span className='Highlight'>{toSentence(bronze, 'and')}</span>{' '}
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
      <span className='Highlight'>{props.podium[0]}</span>
      {props.podium.length > 1 ? (
        <>
          , with 🥈 <span className='Highlight'>{props.podium[1]}</span>{' '}
          {props.podium.length > 2 ? (
            <>
              and 🥉 <span className='Highlight'>{props.podium[2]}</span>{' '}
            </>
          ) : null}
          as {props.podium.length > 2 ? 'respective' : ''} runner-up
          {props.podium.length > 2 ? 's' : ''}
        </>
      ) : null}
      .
    </p>
  )
})
