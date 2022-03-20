import getOrdinalSuffix from './'

describe('The `getOrdinalSuffix` helper', () => {
  it('should handle 1, 2, 3', () => {
    expect(getOrdinalSuffix(1)).toEqual('1st')
    expect(getOrdinalSuffix(2)).toEqual('2nd')
    expect(getOrdinalSuffix(3)).toEqual('3rd')
  })

  it('should handle 11, 12, 13', () => {
    expect(getOrdinalSuffix(11)).toEqual('11th')
    expect(getOrdinalSuffix(12)).toEqual('12th')
    expect(getOrdinalSuffix(13)).toEqual('13th')
  })

  it('should handle other numbers', () => {
    expect(getOrdinalSuffix(20)).toEqual('20th')
    expect(getOrdinalSuffix(21)).toEqual('21st')
    expect(getOrdinalSuffix(22)).toEqual('22nd')
    expect(getOrdinalSuffix(23)).toEqual('23rd')
    expect(getOrdinalSuffix(24)).toEqual('24th')
  })
})
