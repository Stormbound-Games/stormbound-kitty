import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Title from '../Title'
import cards from '../../data/cards'
import { TOOLTIP_STYLES } from '../../constants/stats'

export default React.memo(function ChartMovement(props) {
  const data = cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {
        if (card.type !== 'unit') return acc
        acc[card.movement].value++
        return acc
      },
      [
        { name: 'No movement', value: 0, color: 'rgb(96, 72, 48)' },
        { name: '1 movement', value: 0, color: 'rgb(96, 92, 68)' },
        { name: '2 movement', value: 0, color: 'rgb(96, 112, 88)' },
        { name: '3 movement', value: 0, color: 'rgb(96, 132, 108)' },
      ]
    )

  return (
    <>
      <Title>Unit movement</Title>
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
