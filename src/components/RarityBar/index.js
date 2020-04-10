import React from 'react'
import './index.css'

const RarityBar = props => {
  const getRarityCount = rarity =>
    props.deck.filter(card => card.rarity === rarity).length
  const commons = getRarityCount('common')
  const rares = getRarityCount('rare')
  const epics = getRarityCount('epic')
  const legendaries = getRarityCount('legendary')

  return (
    <div className='RarityBar' aria-hidden>
      {commons > 0 && (
        <div
          className='RarityBar__slice'
          style={{
            '--color': 'rgb(151, 146, 123)',
            '--count': commons,
          }}
        >
          <span className='RarityBar__count' title={commons}>
            {commons}
          </span>
        </div>
      )}
      {rares > 0 && (
        <div
          className='RarityBar__slice'
          style={{
            '--color': 'rgb(31, 174, 224)',
            '--count': rares,
          }}
        >
          <span className='RarityBar__count' title={rares}>
            {rares}
          </span>
        </div>
      )}
      {epics > 0 && (
        <div
          className='RarityBar__slice'
          style={{
            '--color': 'rgb(196, 93, 230)',
            '--count': epics,
          }}
        >
          <span className='RarityBar__count' title={epics}>
            {epics}
          </span>
        </div>
      )}
      {legendaries > 0 && (
        <div
          className='RarityBar__slice'
          style={{
            '--color': 'rgb(232, 137, 49)',
            '--count': legendaries,
          }}
        >
          <span className='RarityBar__count' title={legendaries}>
            {legendaries}
          </span>
        </div>
      )}
    </div>
  )
}

export default RarityBar
