import getAverageStonesPerBook from '../../../src/helpers/getAverageStonesPerBook'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.78571428571432,
    HEROIC: 2.420046082949467,
    CLASSIC: 0.8894697021801293,
    NOBLE: 0.4447348510901963,
    HUMBLE: 0.1482449503633949,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
