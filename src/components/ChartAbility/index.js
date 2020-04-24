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

const ChartAbility = props => {
  const abilities = {
    poison: { name: 'Poison', color: 'var(--shadowfen)' },
    confus: { name: 'Confusion', color: 'var(--confused)' },
    surviv: { name: 'Surviving', color: 'var(--dark-beige)' },
    freeze: { name: 'Freeze', color: 'var(--winter)' },
    command: { name: 'Commanding', color: 'var(--swarm)' },
    push: { name: 'Push/pull', color: 'var(--ironclad)' },
    pull: { name: 'Push/pull', color: 'var(--ironclad)' },
  }
  const regex = new RegExp('(' + Object.keys(abilities).join('|') + ')', 'i')
  const data = Object.values(
    cards.reduce((acc, card) => {
      if (!card.ability) return acc
      const match = card.ability.match(regex)
      if (!match) return acc
      const type = abilities[match[1].toLowerCase()].name

      if (typeof acc[type] === 'undefined') {
        acc[type] = {
          name: type,
          color: abilities[match[1]].color,
          value: 0,
        }
      }
      acc[type].value++
      return acc
    }, {})
  )

  return (
    <>
      <Title>Ability types</Title>
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

export default ChartAbility
