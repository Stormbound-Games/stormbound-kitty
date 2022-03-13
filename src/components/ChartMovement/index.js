import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { CardsContext } from '~/components/CardsProvider'
import Title from '~/components/Title'
import { TOOLTIP_STYLES } from '~/constants/stats'

export default React.memo(function ChartMovement(props) {
  const { cards } = React.useContext(CardsContext)
  const data = cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {
        if (card.type !== 'unit') return acc
        acc[card.movement].value++
        return acc
      },
      [
        { name: 'No movement', value: 0, color: 'var(--swarm)' },
        { name: '1 movement', value: 0, color: '#605c44' },
        { name: '2 movement', value: 0, color: '#607058' },
        { name: '3 movement', value: 0, color: '#60846c' },
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
