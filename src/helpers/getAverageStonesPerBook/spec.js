import getAverageStonesPerBook from './'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.590909090909133,
    HEROIC: 2.3875785504820826,
    CLASSIC: 0.8829761956877628,
    NOBLE: 0.4414880978434301,
    HUMBLE: 0.14716269928114323,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
