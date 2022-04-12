import React from 'react'
import dynamic from 'next/dynamic'
import { CardsContext } from '~/components/CardsProvider'
import Title from '~/components/Title'
import { TOOLTIP_STYLES } from '~/constants/stats'
import { CHIP_CARDS } from '~/constants/game'

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

export default React.memo(function ChartAbility(props) {
  const { cards } = React.useContext(CardsContext)
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
    vital: { name: 'Vitality', color: 'var(--vitalized)' },
    disable: { name: 'Disable', color: 'var(--disabled)' },
  }
  const regex = new RegExp('(' + Object.keys(abilities).join('|') + ')', 'i')
  const data = Object.values(
    cards.reduce((acc, card) => {
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
