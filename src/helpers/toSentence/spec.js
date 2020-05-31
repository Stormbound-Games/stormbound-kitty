import toSentence from './'

describe('The `toSentence` helper', () => {
  it('should turn an array into a sentence', () => {
    expect(toSentence(['Kitty', 'Duck', 'Possum', 'Mammoth'], 'and')).to.equal(
      'Kitty, Duck, Possum, and Mammoth'
    )
  })
})
