import React from 'react'
import Teasers from '../Teasers'
import Title from '../Title'
import SWCC from '../../data/swcc'
import getRawCardData from '../../helpers/getRawCardData'
import serialisation from '../../helpers/serialisation'

export const getCardData = id => {
  const data = serialisation.card.deserialise(id)
  data.image = getRawCardData(data.imageCardId).image || data.imageURL
  data.strength = data.strength.values[0]
  data.mana = data.mana.values[0]
  data.ability = data.ability.values[0]
  data.level = 1
  return data
}

export const CardBuilderHallOfFameSeason = React.memo(props => {
  const ITEMS = props.weeks.map(week => {
    const cardData = getCardData(week.winner.id)

    return {
      card: cardData,
      title: 'Card by ' + week.winner.author,
      meta: `Week #${week.id} – ${week.name}`,
      to: `/card/${week.winner.id}/display`,
      excerpt: (
        <>
          <strong className='Highlight'>Ability:</strong> {cardData.ability}
        </>
      ),
    }
  })

  return <Teasers items={ITEMS} />
})

export default React.memo(function CardBuilderHallOfFame(props) {
  return (
    <>
      <Title>Season 2</Title>
      <CardBuilderHallOfFameSeason
        weeks={SWCC[0].filter(week => !!week.winner)}
      />

      <Title>Season 1</Title>
      <CardBuilderHallOfFameSeason
        weeks={SWCC[1].filter(week => !!week.winner)}
      />
    </>
  )
})
