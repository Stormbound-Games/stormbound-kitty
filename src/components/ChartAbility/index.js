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
import CARDS from '~/data/cards'
import { TOOLTIP_STYLES } from '~/constants/stats'
import { CHIP_CARDS } from '~/constants/game'

export default React.memo(function ChartAbility(props) {
  const abilities = {
    drain: { name: 'Drain', color: 'var(--light-shadowfen)' },
    command: { name: 'Commanding', color: 'var(--swarm)' },
    confus: { name: 'Confusion', color: 'var(--confused)' },
    freeze: { name: 'Freeze', color: 'var(--winter)' },
    frozen: { name: 'Freeze', color: 'var(--winter)' },
    poison: { name: 'Poison', color: 'var(--shadowfen)' },
    pull: { name: 'Push/pull', color: 'var(--ironclad)' },
    push: { name: 'Push/pull', color: 'var(--ironclad)' },
    chip: { name: 'Chip', color: 'var(--beige)' },
    vital: { name: 'Vitality', color: 'var(--vitalised)' },
    disable: { name: 'Disable', color: 'var(--disabled)' },
  }
  const regex = new RegExp('(' + Object.keys(abilities).join('|') + ')', 'i')
  const data = Object.values(
    CARDS.reduce((acc, card) => {
      if (!card.ability) return acc

      const isChip = CHIP_CARDS.includes(card.id)
      const match = card.ability.match(regex)

      if (!match && !isChip) return acc

      if (match) {
        const type = abilities[match[1].toLowerCase()].name

        if (typeof acc[type] === 'undefined') {
          acc[type] = {
            name: type,
            color: abilities[match[1].toLowerCase()].color,
            value: 0,
          }
        }

        acc[type].value++
      }

      if (isChip) {
        if (typeof acc.chip === 'undefined') {
          acc.chip = {
            name: 'Chip',
            color: abilities.chip.color,
            value: 0,
          }
        }

        acc.chip.value++
      }
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
})
