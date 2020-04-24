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

const ChartModifier = props => {
  const data = cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {
        if (card.type !== 'unit') return acc
        if (card.hero) acc[0].value++
        if (card.elder) acc[1].value++
        if (!card.elder && !card.hero) acc[2].value++

        return acc
      },
      [
        { name: 'Hero', value: 0, color: 'var(--ironclad)' },
        { name: 'Elder', value: 0, color: 'var(--shadowfen)' },
        { name: 'None', value: 0, color: 'var(--beige)' },
      ]
    )

  return (
    <>
      <Title>Unit modifiers</Title>
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
}

export default ChartModifier
