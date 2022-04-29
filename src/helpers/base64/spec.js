import { base64Encode, base64Decode } from './'

describe('The `base64Encode` helpers', () => {
  it('should encode to base64', () => {
    expect(base64Encode('ab')).toEqual('YWI=')
  })

  it('should be URL safe', () => {
    expect(base64Encode('ab?')).toEqual(expect.not.stringContaining('/'))
  })
})

describe('The `base64Decode` helpers', () => {
  it('should decode from base64', () => {
    expect(base64Decode('YWI=')).toEqual('ab')
  })

  it('should be URL safe', () => {
    expect(base64Decode('YWI_')).toEqual('ab?')
  })
})
