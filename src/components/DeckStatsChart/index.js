import React from 'react'
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

export default React.memo(function DeckStatsChart(props) {
  const data = Array.from({ length: 15 }, (_, index) => {
    const mana = index + 3
    const { usingAllMana, playingAllCards } = computeDeckChances(
      props.deck,
      mana
    )

    return {
      mana,
      usingAllMana: +usingAllMana.toFixed(2),
      playingAllCards: +playingAllCards.toFixed(2),
    }
  })

  return (
    <>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: -28, bottom: 5 }}
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
            stroke='#8884d8'
          />
          <Line
            name='Chances to play all cards'
            type='monotone'
            dataKey='playingAllCards'
            stroke='#82ca9d'
          />
        </LineChart>
      </ResponsiveContainer>

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
    </>
  )
})
