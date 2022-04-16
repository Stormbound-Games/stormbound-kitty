import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  Bar,
} from 'recharts'
import { CollectionContext } from '~/components/CollectionProvider'
import { CardsContext } from '~/components/CardsProvider'
import { TOOLTIP_STYLES } from '~/constants/stats'
import capitalize from '~/helpers/capitalize'
import countCards from '~/helpers/countCards'
import { RARITIES, RARITY_COPIES } from '~/constants/game'

const getTotalCopiesForCard = (card, rarity) => {
  if (card.missing) return 0

  const maxCopies = RARITY_COPIES[rarity].copies.reduce((a, b) => a + b, 1)
  const levelCopies = RARITY_COPIES[rarity].copies.reduce(
    (acc, copies, index) => (card.level < index + 2 ? acc : acc + copies),
    1
  )

  return Math.min(maxCopies, levelCopies + card.copies)
}

const useCopiesData = () => {
  const { cards, cardsIndex } = React.useContext(CardsContext)
  const { collection } = React.useContext(CollectionContext)

  return RARITIES.map(rarity => {
    const owned = collection
      .filter(card => cardsIndex[card.id].rarity === rarity)
      .reduce(
        (acc, card) =>
          acc + getTotalCopiesForCard(card, cardsIndex[card.id].rarity),
        0
      )
    const total =
      countCards(cards, { rarity }, false) *
      RARITY_COPIES[rarity].copies.reduce((a, b) => a + b, 1)

    return {
      name: capitalize(rarity),
      Owned: owned,
      Missing: total - owned,
      total,
    }
  })
}

export default React.memo(function ChartCollectionCardCopy() {
  const copiesData = useCopiesData()

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        width={500}
        height={300}
        data={copiesData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip
          {...TOOLTIP_STYLES}
          cursor={{ fill: '#ffffff1a' }}
          formatter={(value, name, props) =>
            `${value} copies (${((value / props.payload.total) * 100).toFixed(
              2
            )}%)`
          }
        />
        <Legend />
        <pattern
          id='pattern-stripe'
          width='8'
          height='8'
          patternUnits='userSpaceOnUse'
          patternTransform='rotate(45)'
        >
          <rect
            width='4'
            height='8'
            transform='translate(0,0)'
            fill='white'
          ></rect>
        </pattern>
        <mask id='mask-stripe'>
          <rect
            x='0'
            y='0'
            width='100%'
            height='100%'
            fill='url(#pattern-stripe)'
          />
        </mask>
        <Bar dataKey='Owned' stackId='a' fill='var(--light-shadowfen)' />
        <Bar
          dataKey='Missing'
          stackId='a'
          fill='var(--light-ironclad)'
          fillOpacity='.5'
          mask='url(#mask-stripe)'
        />
      </BarChart>
    </ResponsiveContainer>
  )
})
