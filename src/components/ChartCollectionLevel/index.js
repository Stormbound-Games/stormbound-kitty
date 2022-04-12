import React from 'react'
import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  Cell,
} from 'recharts'
import { CollectionContext } from '~/components/CollectionProvider'
import { TOOLTIP_STYLES } from '~/constants/stats'

const COLORS = [
  '#ded7a4',
  '#cad2aa',
  '#b6cdb0',
  '#a2c8b6',
  '#8ec3bc',
  '#7abec2',
]

const useLevelData = () => {
  const { collection } = React.useContext(CollectionContext)
  const data = [1, 2, 3, 4, 5].map(level => ({
    name: 'Level ' + level,
    value: 0,
    color: COLORS[level],
  }))

  data.unshift({ name: 'Missing', value: 0, color: COLORS[0] })

  collection.forEach(card => {
    if (card.missing) data[0].value++
    else data[card.level].value++
  })

  return data.reverse()
}

export default React.memo(function ChartCollectionLevel() {
  const levelData = useLevelData()

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Tooltip {...TOOLTIP_STYLES} />
        <Legend verticalAlign='bottom' />
        <Pie
          data={levelData}
          dataKey='value'
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          label
          startAngle={90}
          endAngle={360 + 90}
        >
          {levelData.map(level => (
            <Cell key={`cell-${level}`} fill={level.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
})
