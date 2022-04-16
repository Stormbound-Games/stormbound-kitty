import React from 'react'
import { useFela } from 'react-fela'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
} from 'recharts'
import { CollectionContext } from '~/components/CollectionProvider'
import { CardsContext } from '~/components/CardsProvider'
import Checkbox from '~/components/Checkbox'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import { getCardCost } from '~/helpers/getCollectionCost'
import { TOOLTIP_STYLES } from '~/constants/stats'
import styles from './styles'

const useFactionData = ignoreNeutral => {
  const { collection } = React.useContext(CollectionContext)
  const { cardsIndex } = React.useContext(CardsContext)
  const data = {
    neutral: { name: 'Neutral', color: 'var(--beige)', value: 0 },
    swarm: { name: 'Swarm', color: 'var(--swarm)', value: 0 },
    ironclad: { name: 'Ironclad', color: 'var(--ironclad)', value: 0 },
    winter: { name: 'Winter', color: 'var(--winter)', value: 0 },
    shadowfen: { name: 'Shadowfen', color: 'var(--shadowfen)', value: 0 },
  }

  collection.forEach(card => {
    const resolvedCard = getResolvedCardData(cardsIndex, card)

    // It is technically possible for the card not to be found in the collection
    // at all if it was added as a new card in a separate branch, stored in
    // local storage. Then, checking out a branch without this card in the
    // database yet would cause the card not to be found in the collection. It
    // cannot happen in production unless cards ever get removed from the game.
    if (resolvedCard) {
      data[resolvedCard.faction].value += getCardCost(cardsIndex, resolvedCard)
    }
  })

  return Object.keys(data)
    .map(faction => data[faction])
    .slice(ignoreNeutral ? 1 : 0)
}

export default React.memo(function ChartCollectionFaction() {
  const { css } = useFela()
  const [ignoreNeutral, setIgnoreNeutral] = React.useState(false)
  const factionData = useFactionData(ignoreNeutral)

  return (
    <>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Tooltip {...TOOLTIP_STYLES} />
          <Legend verticalAlign='bottom' />
          <Pie
            data={factionData}
            dataKey='value'
            cx='50%'
            cy='50%'
            innerRadius={50}
            outerRadius={80}
            label
          >
            {factionData.map(faction => (
              <Cell key={`cell-${faction}`} fill={faction.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className={css(styles.checkbox)}>
        <Checkbox
          id='ignore-neutral'
          value={ignoreNeutral}
          onChange={event => setIgnoreNeutral(event.target.checked)}
        >
          Ignore neutral cards
        </Checkbox>
      </div>
    </>
  )
})
