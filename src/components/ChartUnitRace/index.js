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
import card from '~/helpers/serialisation/card'
import { TYPES, RACES, RARITIES } from '~/constants/game'

export default React.memo(function ChartUnitRace(props) {

  const races = ['ancient', 'dragon','feline', 'knight', 'pirate', 'dwarf', 'frostling', 'construct', 'rodent', 'raven', 'toad', 'satyr', 'undead']
  const data = props.cards
    .filter(card => !card.token)
    .reduce(
      (acc, card) => {
        if (card.race == null) return acc
        acc[races.indexOf(card.race)].value++
        return acc
      },
      [
        { name: 'Ancient', value: 0, color: '#96d2cf' },      
        { name: 'Dragon', value: 0, color: '#ad5b8f' },      
        { name: 'Feline', value: 0, color: '#f9a2bf' },
        { name: 'Knight', value: 0, color: '#d2cfc8' },
        { name: 'Pirate', value: 0, color: '#fade7d' },
        { name: 'Dwarf', value: 0, color: '#f59138' },
        { name: 'Frostling', value: 0, color: '#71c7e2' },
        { name: 'Construct', value: 0, color: '#ef553c' },
        { name: 'Rodent', value: 0, color: '#f1815c' },
        { name: 'Raven', value: 0, color: '#589651' },
        { name: 'Toad', value: 0, color: '#a4bf43' },
        { name: 'Satyr', value: 0, color: '#f4ad84' },
        { name: 'Undead', value: 0, color: '#d4dfe3' }
      ]
    )

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
