import React from 'react'
import { Link } from 'react-router-dom'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import computeDeckChances from '../../helpers/computeDeckChances'
import { TOOLTIP_STYLES } from '../../constants/stats'
import { BRAWLS } from '../../constants/brawl'
import './index.css'

const computeData = deck => {
  const data = []
  let mana = 3
  let odds = computeDeckChances(deck, mana)

  // This avoids an edge case where no cards are playable on the first turn
  // (yielding 0% on both lines, and therefore never entering the loop).
  while (mana === 3 || (odds.usingAllMana > 0 && odds.playingAllCards < 100)) {
    data.push({
      mana,
      usingAllMana: +odds.usingAllMana.toFixed(2),
      playingAllCards: +odds.playingAllCards.toFixed(2),
    })
    mana += 1
    odds = computeDeckChances(deck, mana)
  }

  data.push({
    mana,
    usingAllMana: +odds.usingAllMana.toFixed(2),
    playingAllCards: +odds.playingAllCards.toFixed(2),
  })

  return data
}

export default React.memo(function DeckStatsChart(props) {
  const data = computeData(props.deck)

  return (
    <>
      <div className='DeckStatsChart__chart'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: -23, bottom: 5 }}
          >
            <XAxis dataKey='mana' />
            <YAxis />
            <Tooltip
              {...TOOLTIP_STYLES}
              labelFormatter={mana => 'Mana ' + mana}
            />
            <Legend align='left' wrapperStyle={{ paddingLeft: '40px' }} />
            <Line
              name='Chances to spend all mana'
              type='monotone'
              dataKey='usingAllMana'
              stroke='rgb(57, 133, 175)'
              strokeWidth={2}
            />
            <Line
              name='Chances to play all cards'
              type='monotone'
              dataKey='playingAllCards'
              stroke='rgb(107, 231, 156)'
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        {props.withHowTo && (
          <Link to='/guides/mana-curve' className='DeckStatsChart__how-to'>
            How to read this graph?
          </Link>
        )}
      </div>

      {props.withModifiers && (
        <div className='DeckStatsChart__select'>
          <label htmlFor='brawl-modifier'>Brawl modifier</label>
          <select
            name='brawl-modifier'
            id='brawl-modifier'
            data-testid='brawl-modifier'
            value={props.modifier}
            onChange={event => props.setModifier(event.target.value)}
          >
            <option value='NONE'>None</option>
            {BRAWLS.filter(brawl => brawl.id.includes('MANA')).map(brawl => (
              <option key={brawl.id} value={brawl.id}>
                {brawl.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  )
})
