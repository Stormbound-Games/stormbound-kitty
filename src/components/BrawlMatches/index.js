import React from 'react'
import serialize from 'form-serialize'
import { BrawlContext } from '../BrawlProvider'
import BrawlMatchForm from '../BrawlMatchForm'
import Icon from '../Icon'
import Table from '../Table'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import capitalise from '../../helpers/capitalise'
import useViewportSize from '../../hooks/useViewportSize'
import './index.css'

const getDefaultFaction = id => {
  if (id.startsWith('SATYR') || id.startsWith('UNDEAD')) {
    return 'swarm'
  }
  if (id.startsWith('FROSTLING') || id.startsWith('DWARF')) {
    return 'winter'
  }
  if (id.startsWith('TOAD') || id.startsWith('RAVEN')) {
    return 'shadowfen'
  }
  if (id.startsWith('CONSTRUCT') || id.startsWith('RODENT')) {
    return 'ironclad'
  }
}

export default React.memo(function BrawlMatches(props) {
  const { viewportWidth } = useViewportSize()
  const [editedMatch, setEditedMatch] = React.useState(null)
  const { brawl, meta, addMatch, updateMatch } = React.useContext(BrawlContext)

  const handleAdd = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })

    addMatch({
      opponentHealth: formData['opponent-health'],
      opponentFaction: formData['opponent-faction'],
      status: formData.status,
    })

    event.target.reset()
  }

  const handleEdit = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })

    updateMatch(editedMatch, {
      opponentHealth: formData['opponent-health'],
      opponentFaction: formData['opponent-faction'],
      status: formData.status,
    })
    setEditedMatch(null)
  }

  let crowns = meta.crowns
  const getMilestone = crowns =>
    MILESTONES.find(milestone => milestone.crowns > crowns) || {}

  return (
    <>
      <Title>Your matches</Title>

      <form
        id='add-match-form'
        onSubmit={editedMatch === null ? handleAdd : handleEdit}
      />
      <Table zebra className='BrawlMatches'>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Opponent’s health</th>
            <th>Opponent’s faction</th>
            <th>Match status</th>
          </tr>
        </thead>
        <tbody>
          {editedMatch === null && (
            <BrawlMatchForm opponentFaction={getDefaultFaction(brawl.id)} />
          )}

          {[...brawl.matches].reverse().map((match, index) => {
            const currMilestone = getMilestone(crowns)
            crowns -= ['LOST', 'SURRENDERED'].includes(match.status) ? 1 : 5
            const nextMilestone = getMilestone(crowns)
            const reversedIndex = brawl.matches.length - index - 1

            if (editedMatch === reversedIndex) {
              return <BrawlMatchForm key={index} {...match} />
            }

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
                <td data-label='Match #'>
                  {brawl.matches.length - index}
                  {viewportWidth >= 700 ? '.' : ''}
                  <button
                    className='BrawlMatches__edit ButtonAsLink'
                    type='button'
                    onClick={() => setEditedMatch(reversedIndex)}
                    data-testid='edit-btn'
                  >
                    <Icon icon='pencil' />
                  </button>
                </td>
                <td data-label='Opponent’s health'>
                  {match.opponentHealth
                    ? `${match.opponentHealth} base health`
                    : 'Unspecified'}
                </td>
                <td data-label='Opponent’s faction'>
                  {capitalise(match.opponentFaction || 'unspecified')}
                </td>
                <td
                  data-label='Match outcome'
                  className={[
                    'BrawlMatches__status',
                    `BrawlMatches__status--${match.status}`,
                  ].join(' ')}
                >
                  {(() => {
                    switch (match.status) {
                      case 'WON':
                        return 'Won'
                      case 'LOST':
                        return 'Lost'
                      case 'FORFEIT':
                        return 'Won by forfeit'
                      case 'SURRENDERED':
                        return 'Lost by forfeit'
                      default:
                        return 'Unknown'
                    }
                  })()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
})
