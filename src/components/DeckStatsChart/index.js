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
import getResolvedCardData from '../../helpers/getResolvedCardData'
import computeDeckChances from '../../helpers/computeDeckChances'
import { TOOLTIP_STYLES } from '../../constants/stats'

export default React.memo(function DeckStatsChart(props) {
  const deck = props.deck.map(getResolvedCardData)
  const data = Array.from({ length: 15 }, (_, index) => {
    const mana = index + 3
    const { usingAllMana, playingAllCards } = computeDeckChances(deck, mana)

    return {
      mana,
      usingAllMana: +usingAllMana.toFixed(2),
      playingAllCards: +playingAllCards.toFixed(2),
    }
  })

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 0, left: -28, bottom: 5 }}
      >
        <XAxis dataKey='mana' />
        <YAxis />
        <Tooltip {...TOOLTIP_STYLES} labelFormatter={mana => 'Mana ' + mana} />
        <Legend />
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
  )
})
