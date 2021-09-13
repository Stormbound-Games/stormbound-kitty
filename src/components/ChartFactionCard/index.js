import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Title from '~/components/Title'
import capitalise from '~/helpers/capitalise'
import getCardsByFaction from '~/helpers/getCardsByFaction'
import { TOOLTIP_STYLES } from '~/constants/stats'

export default React.memo(function ChartFactionCard(props) {
  const cards = getCardsByFaction()
  const data = Object.keys(cards)
    .filter(faction => faction !== 'tokens')
    .map(faction => ({
      name: capitalise(faction),
      value: cards[faction].length,
      color: `var(--${faction})`,
    }))

  return (
    <>
      <Title>Faction Cards</Title>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Tooltip {...TOOLTIP_STYLES} />
          <Legend verticalAlign='bottom' />
          <Pie
            data={data}
            dataKey='value'
            cx='50%'
            cy='50%'
            innerRadius={50}
            outerRadius={80}
            label
            startAngle={90}
            endAngle={360 + 90}
          >
            {data.map(level => (
              <Cell key={`cell-${level}`} fill={level.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
})
