import getCostForLevel from '~/helpers/getCostForLevel'

const isCardUpgradable = (cardsIndex, { id, level, copies, missing }) => {
  if (level === 5) return false

  const { rarity } = cardsIndex[id]
  const costForNextLevel = getCostForLevel(missing ? 1 : level + 1)({
    rarity,
    level,
    copies,
  })

  return costForNextLevel.stones === 0
}

export default isCardUpgradable
