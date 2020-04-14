import getAverageStonesPerBook from '../../../src/helpers/getAverageStonesPerBook'

describe('The `getAverageStonesPerBook` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 6.78571428571432,
    HEROIC: 2.420046082949467,
    CLASSIC: 0.8352961256184341,
    NOBLE: 0.4176480628093745,
    ELDER: 0.37967741935483823,
    HUMBLE: 0.13921602093645524,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getAverageStonesPerBook(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })
})
