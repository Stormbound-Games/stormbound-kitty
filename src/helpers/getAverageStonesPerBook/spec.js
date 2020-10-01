import getAverageStonesPerBook from './'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.590909090909133,
    HEROIC: 2.36217532467564,
    CLASSIC: 0.8739036150428948,
    NOBLE: 0.4369518075208443,
    HUMBLE: 0.14565060250694972,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
