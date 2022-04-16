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
import getResolvedCardData from '~/helpers/getResolvedCardData'
import { getCardCost } from '~/helpers/getCollectionCost'
import { TOOLTIP_STYLES } from '~/constants/stats'

const useRarityData = () => {
  const { collection } = React.useContext(CollectionContext)
  const { cardsIndex } = React.useContext(CardsContext)
  const data = {
    common: { name: 'Common', value: 0 },
    rare: { name: 'Rare', value: 0 },
    epic: { name: 'Epic', value: 0 },
    legendary: { name: 'Legendary', value: 0 },
  }

  collection.forEach(card => {
    const resolvedCard = getResolvedCardData(cardsIndex, card)

    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    if (resolvedCard) {
      data[resolvedCard.rarity].value += getCardCost(cardsIndex, resolvedCard)
    }
  })

  return Object.keys(data).map(rarity => data[rarity])
}

export default React.memo(function ChartCollectionRarity() {
  const rarityData = useRarityData()

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Tooltip {...TOOLTIP_STYLES} />
        <Legend verticalAlign='bottom' />
        <Pie
          data={rarityData}
          dataKey='value'
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          label
        >
          {rarityData.map(rarity => (
            <Cell
              key={`cell-${rarity}`}
              fill={`var(--${rarity.name.toLowerCase()})`}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
})
