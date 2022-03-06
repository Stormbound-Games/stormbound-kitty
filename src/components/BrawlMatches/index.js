import React from 'react'
import { useFela } from 'react-fela'
import serialize from 'form-serialize'
import { BrawlContext } from '~/components/BrawlProvider'
import BrawlLossCounter from '~/components/BrawlLossCounter'
import BrawlMatchForm from '~/components/BrawlMatchForm'
import Icon from '~/components/Icon'
import Link from '~/components/Link'
import Only from '~/components/Only'
import Spacing from '~/components/Spacing'
import Table from '~/components/Table'
import Title from '~/components/Title'
import {
  BRAWL_MILESTONES,
  CROWN_REWARDS,
  VICTORY_BONUSES,
} from '~/constants/brawl'
import capitalize from '~/helpers/capitalize'
import styles from './styles'

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
  const { css } = useFela()
  const [editedMatch, setEditedMatch] = React.useState(null)
  const { session, meta, addMatch, updateMatch } =
    React.useContext(BrawlContext)

  const handleAdd = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })

    addMatch({
      opponentHealth: formData['opponent-health'],
      opponentFaction: formData['opponent-faction'],
      status: formData.status,
      bonus: formData.bonus,
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
      bonus: formData.bonus,
    })
    setEditedMatch(null)
  }

  let crowns = meta.crowns
  const getMilestone = crowns =>
    BRAWL_MILESTONES[props.difficulty].find(
      milestone => milestone.crowns > crowns
    ) || {}

  return (
    <div className={css(styles.matches)}>
      <Title>Your matches</Title>
      <BrawlLossCounter />

      <form
        id='add-match-form'
        onSubmit={editedMatch === null ? handleAdd : handleEdit}
      />

      <Spacing bottom='LARGEST'>
        <Table zebra extend={styles.table}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Opponent’s health</th>
              <th>Opponent’s faction</th>
              <th>Match status</th>
              <th>Victory bonus</th>
            </tr>
          </thead>
          <tbody>
            {editedMatch === null && (
              <BrawlMatchForm
                opponentFaction={getDefaultFaction(session.id)}
                // Reset the component and its internal states once a match has
                // been added.
                key={session.matches.length}
              />
            )}

            {[...session.matches].reverse().map((match, index) => {
              const currMilestone = getMilestone(crowns)
              crowns -= CROWN_REWARDS[match.status]
              const nextMilestone = getMilestone(crowns)
              const reversedIndex = session.matches.length - index - 1

              if (editedMatch === reversedIndex) {
                return <BrawlMatchForm key={index} {...match} isEdit />
              }

              return (
                <tr
                  data-testid='match'
                  key={index}
                  className={css(
                    styles.milestone({
                      isActive: currMilestone.crowns !== nextMilestone.crowns,
                    })
                  )}
                >
                  <td data-label='Match #'>
                    {session.matches.length - index}
                    <Only.Desktop>.</Only.Desktop>
                    <Link
                      extend={styles.edit}
                      onClick={() => setEditedMatch(reversedIndex)}
                      data-testid='edit-btn'
                    >
                      <Icon icon='pencil' />
                    </Link>
                  </td>
                  <td data-label='Opponent’s health'>
                    {match.opponentHealth
                      ? `${match.opponentHealth} base health`
                      : 'Unspecified'}
                  </td>
                  <td data-label='Opponent’s faction'>
                    {capitalize(match.opponentFaction || 'unspecified')}
                  </td>
                  <td
                    data-label='Match outcome'
                    className={css(styles.status({ status: match.status }))}
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
                        case 'DRAW':
                          return 'Draw'
                        default:
                          return 'Unknown'
                      }
                    })()}
                  </td>
                  <td data-label='Victory bonus'>
                    {VICTORY_BONUSES[match.bonus]?.label ?? 'n/a'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Spacing>
    </div>
  )
})
