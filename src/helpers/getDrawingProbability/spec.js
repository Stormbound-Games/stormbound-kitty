import getDrawingProbability from './'

describe('The `getDrawingProbability` helper', () => {
  it('should return 0 for a specific common card in a Mythic Tome', () => {
    expect(
      getDrawingProbability(global.__CARDS__, 'MYTHIC', [1, 0, 0, 0])
    ).toEqual(0)
  })
  it('should return 0 for a specific common card in a Heroic Tome', () => {
    expect(
      getDrawingProbability(global.__CARDS__, 'HEROIC', [1, 0, 0, 0])
    ).toEqual(0)
  })
  it('should return 0 for a specific rare card in a Mythic Tome', () => {
    expect(
      getDrawingProbability(global.__CARDS__, 'MYTHIC', [0, 1, 0, 0])
    ).toEqual(0)
  })
})
