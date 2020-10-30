import getAverageStonesPerBook from './'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.532769556025395,
    HEROIC: 2.3414112050741602,
    CLASSIC: 0.8705813559065602,
    NOBLE: 0.43529067795274357,
    HUMBLE: 0.1450968926509143,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
