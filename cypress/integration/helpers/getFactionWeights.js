import getFactionWeights from '../../../src/helpers/getFactionWeights'

const RANDOM_DECK =
  'NU4xNiw1TjM2LDVONjgsNU41Myw1TjE4LDVOMiw1RjE5LDVGOCw1TjE1LDVONTksNUY1LDVONQ'

describe('The `getFactionWeights` helper', () => {
  it(`should return an array with constant weigths with no modifier`, () => {
    const expectedResults = {
      ironclad: 1,
      shadowfen: 1,
      swarm: 1,
      winter: 1,
    }
    const result = getFactionWeights('NONE')

    Object.keys(expectedResults).forEach(faction =>
      expect(
        result.find(factionData => factionData.id === faction).weight
      ).to.equal(expectedResults[faction])
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
    const result = getFactionWeights(modifier)

    cy.visit(`/deck/${RANDOM_DECK}/dry-run`)
      .drReset({ modifier })
      .then(() =>
        Object.keys(expectedResults).forEach(faction =>
          expect(
            result.find(factionData => factionData.id === faction).weight
          ).to.equal(expectedResults[faction])
        )
      )
  })
})
