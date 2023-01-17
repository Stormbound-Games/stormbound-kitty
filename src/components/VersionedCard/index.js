import React from 'react'
import { CardsContext } from '#components/CardsProvider'
import Card from '#components/Card'
import getResolvedCardData from '#helpers/getResolvedCardData'
import unfoldValue from '#helpers/unfoldValue'
import resolveAbility from '#helpers/resolveAbility'

const getLevelValue = (levels, level) => levels?.[level - 1] ?? levels?.[0]

export default React.memo(function VersionedCard({
  id,
  currentMana,
  date,
  level = 1,
  versions = [],
}) {
  const { cardsIndex } = React.useContext(CardsContext)
  const currentData = getResolvedCardData(cardsIndex, { id, level })

  // If no date or no versions were passed to the component, this is the latest
  // version of the card and we can just return the card with its resolved data.
  if (!date || !versions || versions.length === 0) {
    return (
      <Card {...currentData} affordable={currentData.mana <= currentMana} />
    )
  }

  // Start from the current card data and recursively apply version changes
  // until reaching the date of the puzzle.
  const versionedData = versions
    .filter(version => version.timestamp >= date)
    .reduce((acc, version) => ({ ...acc, ...version.from }), currentData)

  // Then make sure the leveled-data is read for the right level.
  const card = {
    ...versionedData,
    mana: getLevelValue(unfoldValue(versionedData.mana), level),
    strength: getLevelValue(unfoldValue(versionedData.strength), level),
    ability: getLevelValue(resolveAbility(versionedData.ability).values, level),
  }

  // Finally render the card with the right data.
  return <Card {...card} affordable={card.mana <= currentMana} />
})
