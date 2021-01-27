import getAverageStonesPerBook from './'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.424242424242465,
    HEROIC: 2.3026515151517497,
    CLASSIC: 0.8643798055193992,
    NOBLE: 0.4321899027589535,
    HUMBLE: 0.14406330091964725,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
