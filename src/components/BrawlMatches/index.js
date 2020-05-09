import React from 'react'
import serialize from 'form-serialize'
import { BrawlContext } from '../BrawlProvider'
import BrawlMatchForm from '../BrawlMatchForm'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import capitalise from '../../helpers/capitalise'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

export default React.memo(function BrawlMatches(props) {
  const viewportWidth = useViewportWidth()
  const { brawl, meta, addMatch } = React.useContext(BrawlContext)

  const onSubmit = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })

    addMatch({
      opponentHealth: formData['opponent-health'],
      opponentFaction: formData['opponent-faction'],
      status: formData.status,
    })

    event.target.reset()
  }

  let crowns = meta.crowns
  const getMilestone = crowns =>
    MILESTONES.find(milestone => milestone.crowns > crowns) || {}

  return (
    <>
      <Title>Your matches</Title>

      <form id='add-match-form' onSubmit={onSubmit} />
      <table className='BrawlMatches'>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Opponent’s health</th>
            <th>Opponent’s faction</th>
            <th>Match status</th>
          </tr>
        </thead>
        <tbody>
          <BrawlMatchForm onSubmit={onSubmit} />
          {[...brawl.matches].reverse().map((match, index) => {
            const currMilestone = getMilestone(crowns)
            crowns -= match.status === 'LOST' ? 1 : 5
            const nextMilestone = getMilestone(crowns)

            return (
              <tr
                data-testid='match'
                key={index}
                className={[
                  currMilestone.crowns !== nextMilestone.crowns &&
                    'BrawlMatches__milestone',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <td>
                  {brawl.matches.length - index}
                  {viewportWidth >= 700 ? '.' : ''}
                </td>
                <td>{match.opponentHealth} base health</td>
                <td>{capitalise(match.opponentFaction)}</td>
                <td
                  className={[
                    'BrawlMatches__status',
                    `BrawlMatches__status--${match.status}`,
                  ].join(' ')}
                >
                  {match.status === 'WON'
                    ? 'Won'
                    : match.status === 'LOST'
                    ? 'Lost'
                    : 'Won by forfeit'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
})
