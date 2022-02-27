import getDrawingProbability from './'

describe.skip('The `getDrawingProbability` helper', () => {
  it('should return 0 for a specific common card in a Mythic Tome', () => {
    expect(getDrawingProbability('MYTHIC', [1, 0, 0, 0])).toEqual(0)
  })
  it('should return 0 for a specific common card in a Heroic Tome', () => {
    expect(getDrawingProbability('HEROIC', [1, 0, 0, 0])).toEqual(0)
  })
  it('should return 0 for a specific rare card in a Mythic Tome', () => {
    expect(getDrawingProbability('MYTHIC', [0, 1, 0, 0])).toEqual(0)
  })
})
