import getRawCardData from '../getRawCardData'
import getCostForLevel from '../getCostForLevel'

export default ({ id, level, copies, missing }) => {
  if (level === 5) return false

  const { rarity } = getRawCardData(id)
  const costForNextLevel = getCostForLevel(missing ? 1 : level + 1)({
    rarity,
    level,
    copies,
  })

  return costForNextLevel.stones === 0
}
