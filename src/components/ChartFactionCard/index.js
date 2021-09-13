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
import { TOOLTIP_STYLES } from '~/constants/stats'

export default React.memo(function ChartFactionCard(props) {

  const factions = ['neutral', 'winter', 'ironclad', 'shadowfen', 'swarm']
  const data = props.cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {        
        acc[factions.indexOf(card.faction)].value++
        return acc
      },
      [
        { name: 'Neutral', value: 0, color: 'var(--beige)' },
        { name: 'Winterpact', value: 0, color: 'var(--winter)' },
        { name: 'Ironclad', value: 0, color: 'var(--ironclad)' },
        { name: 'Shadowfen', value: 0, color: 'var(--shadowfen)' },
        { name: 'Swarm', value: 0, color: 'var(--swarm)' }
      ]
    )

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
