import generateId from './'

describe('The `generateId` helper', () => {
  it('should lowercase the content', () => {
    expect(generateId('KiTTy')).to.equal('kitty')
  })

  it('should remove single quotes and commas', () => {
    expect(generateId("KiTTy’scutest'kitten'")).to.equal('kittyscutestkitten')
  })

  it('should replace spaces with hyphens', () => {
    expect(generateId('kittys cutest kitten')).to.equal('kittys-cutest-kitten')
  })
})
