import getAverageStonesPerBook from './'

// This test gets outdated every month when a new card gets added.
describe.skip('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.299407114624558,
    HEROIC: 2.2680830039523276,
    CLASSIC: 0.8395256917014182,
    NOBLE: 0.4197628458498357,
    HUMBLE: 0.1399209486166033,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
