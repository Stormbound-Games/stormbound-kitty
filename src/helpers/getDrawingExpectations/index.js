import countCards from '~/helpers/countCards'
import { RARITIES } from '~/constants/game'

const getDrawingExpectations = type => {
  if (type === 'FUSION_STONES') {
    return {
      label: 'Fusion stones',
      getExpectations: () => [1, 1, 1, 1],
    }
  }

  if (type.startsWith('SPECIFIC_')) {
    const rarity = type.replace('SPECIFIC_', '').toLowerCase()

    return {
      label: `a specific ${rarity} card`,
      getExpectations: () => RARITIES.map(r => +(r === rarity)),
    }
  }

  if (type.startsWith('ANY_')) {
    const rarity = type.replace('ANY_', '').toLowerCase()

    return {
      label: `any ${rarity} card`,
      getExpectations: (cards, criteria) =>
        RARITIES.map(r =>
          r === rarity ? countCards(cards, { ...criteria, rarity }, false) : 0
        ),
    }
  }

  return { label: 'unknown card', getExpectations: () => [0, 0, 0, 0] }
}

export default getDrawingExpectations
