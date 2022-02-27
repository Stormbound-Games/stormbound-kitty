import { getCardCost } from './'

describe('The `getCardCost` helper', () => {
  const rarities = ['common', 'rare', 'epic', 'legendary']
  const ids = ['N2', 'N1', 'N18', 'N8']
  const missingCost = [0, 0, 0, 0]
  const intermediateCost = [50, 108, 205, 380]
  const level5Cost = [152, 290, 460, 650]
  const requirements = [
    { level: 1, copies: 0, missing: true },
    { level: 3, copies: 8, missing: false },
    { level: 4, copies: 31, missing: false },
    { level: 5, copies: 0, missing: false },
    { level: 5, copies: 1, missing: false },
  ]
  const results = [
    missingCost,
    intermediateCost,
    level5Cost,
    level5Cost,
    level5Cost,
  ]

  requirements.forEach((requirement, index) => {
    ids.forEach((id, rarityIndex) => {
      const cardDescription = requirement.missing
        ? 'missing'
        : `level ${requirement.level + ' ' + rarities[rarityIndex]}`
      const cost = results[index][rarityIndex]

      it(`should check that a ${cardDescription} card with ${requirement.copies} copies has a value of ${cost}`, () => {
        expect(
          getCardCost(global.__CARDS_INDEX__, { id, ...requirement })
        ).toEqual(cost)
      })
    })
  })
})
