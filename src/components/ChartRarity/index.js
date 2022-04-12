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
import { RARITIES } from '~/constants/game'
import { TOOLTIP_STYLES } from '~/constants/stats'
import capitalize from '~/helpers/capitalize'
import countCards from '~/helpers/countCards'

export default React.memo(function ChartRarity(props) {
  const { cards } = React.useContext(CardsContext)
  const data = RARITIES.map(rarity => ({
    name: capitalize(rarity),
    value: countCards(cards, { rarity }) - 1,
    color: `var(--${rarity})`,
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
