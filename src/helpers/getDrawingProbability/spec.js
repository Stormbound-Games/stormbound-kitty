import getDrawingProbability from './'

describe('The `getDrawingProbability` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 0.17499999999999938,
    HEROIC: 0.11188869724025574,
    CLASSIC: 0.09273007002328049,
    NOBLE: 0.0469145575692963,
    HUMBLE: 0.015760937600956426,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getDrawingProbability(bookType, [1, 1, 1, 1])).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })

  it('should return 0 for a specific common card in a MYTHIC book', () => {
    expect(getDrawingProbability('MYTHIC', [1, 0, 0, 0])).to.equal(0)
  })
  it('should return 0 for a specific common card in a HEROIC book', () => {
    expect(getDrawingProbability('HEROIC', [1, 0, 0, 0])).to.equal(0)
  })
  it('should return 0 for a specific rare card in a MYTHIC book', () => {
    expect(getDrawingProbability('MYTHIC', [0, 1, 0, 0])).to.equal(0)
  })
})
