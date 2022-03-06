import getFactionWeights from './'

describe('The `getFactionWeights` helper', () => {
  it(`should return an array with constant weigths with no modifier`, () => {
    const expectedResults = {
      ironclad: 1,
      shadowfen: 1,
      swarm: 1,
      winter: 1,
    }
    const result = getFactionWeights(global.__BRAWLS__, 'NONE')

    Object.keys(expectedResults).forEach(faction =>
      expect(
        result.find(factionData => factionData.id === faction).weight
      ).toEqual(expectedResults[faction])
    )
  })

  it(`should return an array with weigths biased towards the correct faction with a modifier`, () => {
    const modifier = 'TOAD_MANA'
    const expectedResults = {
      ironclad: 1,
      shadowfen: 12,
      swarm: 1,
      winter: 1,
    }
    const result = getFactionWeights(global.__BRAWLS__, modifier)

    Object.keys(expectedResults).forEach(faction =>
      expect(
        result.find(factionData => factionData.id === faction).weight
      ).toEqual(expectedResults[faction])
    )
  })
})
