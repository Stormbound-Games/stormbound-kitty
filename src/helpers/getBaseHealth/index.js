/* Experience to reach fortress level… */
const EXPERIENCE_TABLE = [
  /* 20 */ 8000, /* 19 */ 6000, /* 18 */ 4400, /* 17 */ 3000, /* 16 */ 1900,
  /* 15 */ 1200, /* 14 */ 650, /* 13 */ 400, /* 12 */ 200, /* 11 */ 100,
  /* 10 */ 0,
]

const EXPERIENCE_MAP = {
  common: [1, 2, 5, 13, 30],
  rare: [2, 4, 10, 26, 60],
  epic: [3, 6, 15, 39, 90],
  legendary: [5, 10, 25, 65, 150],
}

export const getExperience = (collection, cardsIndex) =>
  collection.reduce((acc, card) => {
    const { level, missing, id } = card

    if (card.token || missing) return acc

    const sum = (a, b) => a + b
    const { rarity } = cardsIndex[id]

    return acc + EXPERIENCE_MAP[rarity].slice(0, level).reduce(sum, 0)
  }, 0)

export const computeBaseHealth = experience =>
  20 - EXPERIENCE_TABLE.findIndex(amount => experience >= amount)

export const computeProgress = experience => {
  const index = EXPERIENCE_TABLE.findIndex(amount => experience >= amount)
  const level = EXPERIENCE_TABLE[index]
  const nextLevel = EXPERIENCE_TABLE[index - 1]

  return index === 0 ? 1 : (experience - level) / (nextLevel - level)
}

const getBaseHealth = (collection, cardsIndex) => {
  const experience =
    typeof collection === 'number'
      ? collection
      : getExperience(collection, cardsIndex)

  return {
    experience,
    level: computeBaseHealth(experience),
    progress: computeProgress(experience),
  }
}

export default getBaseHealth
