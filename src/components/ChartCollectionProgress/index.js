import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Tooltip,
  Legend,
  Pie,
  Cell,
} from 'recharts'
import { CollectionContext } from '~/components/CollectionProvider'
import { CardsContext } from '~/components/CardsProvider'
import { TOOLTIP_STYLES } from '~/constants/stats'
import { RARITIES } from '~/constants/game'
import capitalize from '~/helpers/capitalize'

const useProgressData = () => {
  const { cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)

  return RARITIES.map(rarity => {
    return collection
      .filter(card => cardsIndex[card.id].rarity === rarity)
      .reduce(
        (acc, card) => {
          acc[card.level === 5 ? 0 : 1].value++

          return acc
        },
        [
          {
            color: `var(--${rarity}-bright)`,
            name: 'Maxed out ' + capitalize(rarity),
            value: 0,
          },
          {
            color: `var(--${rarity})`,
            name: 'In progress ' + capitalize(rarity),
            value: 0,
          },
        ]
      )
  }).flat()
}

export default React.memo(function ChartCollectionProgress(props) {
  const progressData = useProgressData()

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Tooltip {...TOOLTIP_STYLES} />
        <Legend verticalAlign='bottom' />
        <Pie
          data={progressData}
          dataKey='value'
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          label
        >
          {progressData.map(level => (
            <Cell key={`cell-${level}`} fill={level.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
})
