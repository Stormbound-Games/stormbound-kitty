import getDrawingProbability from '../../../src/helpers/getDrawingProbability'

describe('The `getDrawingProbability` helper', () => {
  const FUSION_STONES = {
    MYTHIC: 17.85714285714294,
    HEROIC: 11.451338599956063,
    CLASSIC: 8.302129947958125,
    NOBLE: 4.198831015640114,
    ELDER: 1.937788018433173,
    HUMBLE: 1.4102804801729651,
  }

  Object.keys(FUSION_STONES).forEach(bookType => {
    it(`should return ${FUSION_STONES[bookType]}% for a ${bookType} book`, () => {
      expect(getDrawingProbability(bookType, 'FUSION_STONES')).to.equal(
        FUSION_STONES[bookType]
      )
    })
  })

  it('should return 0% for a specific common card in a MYTHIC book', () => {
    expect(getDrawingProbability('MYTHIC', 'COMMON')).to.equal(0)
  })
  it('should return 0% for a specific common card in a HEROIC book', () => {
    expect(getDrawingProbability('HEROIC', 'COMMON')).to.equal(0)
  })
  it('should return 0% for a specific common card in a ELDER book', () => {
    expect(getDrawingProbability('ELDER', 'COMMON')).to.equal(0)
  })
  it('should return 0% for a specific rare card in a MYTHIC book', () => {
    expect(getDrawingProbability('MYTHIC', 'RARE')).to.equal(0)
  })
})
