import getDrawingProbability from './'

// This test gets outdated every month when a new card gets added.
describe.skip('The `getDrawingProbability` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 0.16749011857707563,
    HEROIC: 0.10791636722960829,
    CLASSIC: 0.08909317463168909,
    NOBLE: 0.04505477578153061,
    HUMBLE: 0.015131752305665436,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getDrawingProbability(bookType, [1, 1, 1, 1])).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })

  it('should return 0 for a specific common card in a Mythic Tome', () => {
    expect(getDrawingProbability('MYTHIC', [1, 0, 0, 0])).to.equal(0)
  })
  it('should return 0 for a specific common card in a Heroic Tome', () => {
    expect(getDrawingProbability('HEROIC', [1, 0, 0, 0])).to.equal(0)
  })
  it('should return 0 for a specific rare card in a Mythic Tome', () => {
    expect(getDrawingProbability('MYTHIC', [0, 1, 0, 0])).to.equal(0)
  })
})
