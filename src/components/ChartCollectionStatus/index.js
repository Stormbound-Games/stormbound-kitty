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
import isCardUpgradable from '~/helpers/isCardUpgradable'
import { TOOLTIP_STYLES } from '~/constants/stats'

const useStatusData = () => {
  const { collection } = React.useContext(CollectionContext)
  const { cardsIndex } = React.useContext(CardsContext)
  const data = {
    upgradable: { name: 'Upgradable', color: 'var(--upgradable)', value: 0 },
    notUpgradable: {
      name: 'Not upgradable',
      color: '#a2b9b6',
      value: 0,
    },
    missing: { name: 'Missing', color: '#ded7a4', value: 0 },
    maxedOut: { name: 'Maxed out', color: '#7abec2', value: 0 },
  }

  collection.forEach(card => {
    if (card.missing) data.missing.value++
    else if (isCardUpgradable(cardsIndex, card)) data.upgradable.value++
    else if (card.level === 5) data.maxedOut.value++
    else data.notUpgradable.value++
  })

  return Object.keys(data).map(status => data[status])
}

export default React.memo(function ChartCollectionStatus(props) {
  const statusData = useStatusData()

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Tooltip {...TOOLTIP_STYLES} />
        <Legend verticalAlign='bottom' />
        <Pie
          data={statusData}
          dataKey='value'
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          label
        >
          {statusData.map(level => (
            <Cell key={`cell-${level}`} fill={level.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
})
