import React from 'react'
import serialize from 'form-serialize'
import { BrawlContext } from '../BrawlProvider'
import BrawlMatchForm from '../BrawlMatchForm'
import Title from '../Title'
import capitalise from '../../helpers/capitalise'
import useViewportWidth from '../../hooks/useViewportWidth'
import './index.css'

export default React.memo(function BrawlMatches(props) {
  const viewportWidth = useViewportWidth()
  const { brawl, addMatch } = React.useContext(BrawlContext)

  const onSubmit = event => {
    event.preventDefault()

    const formData = serialize(event.target, { hash: true })

    addMatch({
      oBH: formData['opponent-health'],
      oFaction: formData['opponent-faction'],
      status: formData.won === 'on' ? 'WIN' : 'LOSS',
    })

    event.target.reset()
  }

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
          {[...brawl.matches].reverse().map((match, index) => (
            <tr key={index}>
              <td>
                {brawl.matches.length - index}
                {viewportWidth >= 700 ? '.' : ''}
              </td>
              <td>{match.oBH} base health</td>
              <td>{capitalise(match.oFaction)}</td>
              <td
                className={[
                  'BrawlMatches__status',
                  `BrawlMatches__status--${match.status}`,
                ].join(' ')}
              >
                {match.status === 'WIN' ? 'Won' : 'Loss'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
})
