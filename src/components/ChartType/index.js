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

export default React.memo(function ChartType(props) {
  const { cards } = React.useContext(CardsContext)
  const types = ['unit', 'spell', 'structure']
  const data = cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {
        acc[types.indexOf(card.type)].value++
        return acc
      },
      [
        { name: 'Units', value: 0, color: 'var(--green)' },
        { name: 'Spells', value: 0, color: 'var(--light-blue)' },
        { name: 'Structures', value: 0, color: 'var(--dark-blue)' },
      ]
    )

  return (
    <>
      <Title>Card type</Title>
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
