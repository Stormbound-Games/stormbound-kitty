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
import { RARITIES } from '~/constants/game'
import { TOOLTIP_STYLES } from '~/constants/stats'
import capitalise from '~/helpers/capitalise'
import countCards from '~/helpers/countCards'
import { getRarityColor } from '~/helpers/getRarity'

export default React.memo(function ChartRarity(props) {
  const data = Object.keys(RARITIES).map(rarity => ({
    name: capitalise(rarity),
    value: countCards({ rarity }) - 1,
    color: getRarityColor(rarity),
  }))

  return (
    <>
      <Title>Card rarity</Title>
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
