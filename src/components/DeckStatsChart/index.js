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
import Loader from '../../components/Loader'
import computeDeckChances from '../../helpers/computeDeckChances/async'
import { TOOLTIP_STYLES } from '../../constants/stats'
import { BRAWLS } from '../../constants/brawl'
import './index.css'

const computeData = async (deck, modifier) => {
  const data = []
  const odds = await computeDeckChances(deck, modifier)
  const maxMana = Math.min(
    odds.usingAllMana.length,
    odds.playingAllCards.length
  )

  for (let mana = 3; mana < maxMana; mana++) {
    data.push({
      mana,
      usingAllMana: odds.usingAllMana[mana].toFixed(2),
      playingAllCards: +odds.playingAllCards[mana].toFixed(2),
    })
  }

  return data
}

export default React.memo(function DeckStatsChart(props) {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)

    computeData(props.deck, props.modifier)
      .then(response => setData(response))
      .finally(() => setLoading(false))
  }, [props.deck, props.modifier])

  // Only enable the loading state when there is no data to begin with, but
  // not when re-rendering the chart, so the visualisation animates from the
  // current state to the new state without display a spinner in between.
  if (loading && data.length === 0) return <Loader />

  return (
    <>
      <div className='DeckStatsChart__chart'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: -23, bottom: 5 }}
            syncId={props.syncId}
          >
            <XAxis dataKey='mana' />
            <YAxis />
            <Tooltip
              {...TOOLTIP_STYLES}
              labelFormatter={mana => 'Mana ' + mana}
              formatter={(value, entry, index) => `${value}%`}
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
