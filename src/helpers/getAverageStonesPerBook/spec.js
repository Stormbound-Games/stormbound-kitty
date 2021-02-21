import getAverageStonesPerBook from './'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.299407114624558,
    HEROIC: 2.2919466403159956,
    CLASSIC: 0.852396245061003,
    NOBLE: 0.4261981225296716,
    HUMBLE: 0.14206604084321717,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
