import toSentence from './'

describe('The `toSentence` helper', () => {
  it('should turn an array into a sentence', () => {
    expect(toSentence(['Kitty', 'Duck', 'Possum', 'Mammoth'], 'and')).to.equal(
      'Kitty, Duck, Possum, and Mammoth'
    )
  })

  it('should return an empty string', () => {
    expect(toSentence([])).to.equal('')
  })

  it('should return a single word', () => {
    expect(toSentence(['Kitty'], 'and')).to.equal('Kitty')
  })
})
