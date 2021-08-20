import generateId from './'

describe('The `generateId` helper', () => {
  it('should lowercase the content', () => {
    expect(generateId('KiTTy')).toEqual('kitty')
  })

  it('should remove single quotes and commas', () => {
    expect(generateId("KiTTy’scutest'kitten'")).toEqual('kittyscutestkitten')
  })

  it('should replace spaces with hyphens', () => {
    expect(generateId('kittys cutest kitten')).toEqual('kittys-cutest-kitten')
  })
})
