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
import { BrawlContext } from '~/components/BrawlProvider'
import { TOOLTIP_STYLES } from '~/constants/stats'

export default React.memo(function BrawlCharts(props) {
  const { meta } = React.useContext(BrawlContext)

  const data = [
    {
      name: 'Spent',
      value: meta.coinsSpent,
      color: 'var(--light-ironclad)',
    },
    {
      name: 'Earned',
      value: props.income,
      color: 'var(--light-shadowfen)',
    },
  ]

  return (
    <>
      <Title>Coins</Title>
      <ResponsiveContainer width='100%' height={250}>
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
