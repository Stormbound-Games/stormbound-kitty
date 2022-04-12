import React from 'react'
import dynamic from 'next/dynamic'
import { CardsContext } from '~/components/CardsProvider'
import Title from '~/components/Title'
import capitalize from '~/helpers/capitalize'
import getCardsByFaction from '~/helpers/getCardsByFaction'
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

export default React.memo(function ChartFactionCard(props) {
  const { cards: allCards } = React.useContext(CardsContext)
  const cards = getCardsByFaction(allCards)
  const data = Object.keys(cards)
    .filter(faction => faction !== 'tokens')
    .map(faction => ({
      name: capitalize(faction),
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
