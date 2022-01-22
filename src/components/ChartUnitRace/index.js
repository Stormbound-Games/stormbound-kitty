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
import capitalize from '~/helpers/capitalize'
import countCards from '~/helpers/countCards'

export default React.memo(function ChartUnitRace(props) {
  const RACES = {
    frostling: 'var(--winter)',
    dwarf: 'var(--light-winter)',
    construct: 'var(--ironclad)',
    rodent: 'var(--light-ironclad)',
    raven: 'var(--shadowfen)',
    toad: 'var(--light-shadowfen)',
    undead: 'var(--swarm)',
    satyr: 'var(--light-swarm)',
    knight: 'var(--neutral)',
    pirate: 'var(--affordable)',
    dragon: 'var(--dark-beige)',
    feline: 'var(--beige)',
  }
  const data = Object.keys(RACES).map(race => ({
    name: capitalize(race),
    value: countCards({ race }, false),
    color: RACES[race],
  }))

  return (
    <>
      <Title>Unit races</Title>
      <ResponsiveContainer width='100%' height={350}>
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
