import React from 'react'
import dynamic from 'next/dynamic'
import { CardsContext } from '~/components/CardsProvider'
import Title from '~/components/Title'
import { TOOLTIP_STYLES } from '~/constants/stats'

const Cell = dynamic(() => import('recharts').then(module => module.Cell))
const Legend = dynamic(() => import('recharts').then(module => module.Legend))
const Pie = dynamic(() => import('recharts').then(module => module.Pie))
const PieChart = dynamic(() =>
  import('recharts').then(module => module.PieChart)
)
const ResponsiveContainer = dynamic(() =>
  import('recharts').then(module => module.ResponsiveContainer)
)
const Tooltip = dynamic(() => import('recharts').then(module => module.Tooltip))

export default React.memo(function ChartModifier(props) {
  const { cards } = React.useContext(CardsContext)
  const data = cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {
        if (card.type !== 'unit') return acc
        if (card.hero) acc[0].value++
        if (card.elder) acc[1].value++
        if (card.ancient) acc[2].value++
        if (!card.elder && !card.hero && !card.ancient) acc[3].value++

        return acc
      },
      [
        { name: 'Hero', value: 0, color: 'var(--ironclad)' },
        { name: 'Elder', value: 0, color: 'var(--shadowfen)' },
        { name: 'Ancient', value: 0, color: 'var(--winter)' },
        { name: 'None', value: 0, color: 'var(--beige)' },
      ]
    )

  return (
    <>
      <Title>Race modifiers</Title>
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
