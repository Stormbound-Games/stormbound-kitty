import toSentence from './'

describe('The `toSentence` helper', () => {
  it('should turn an array into a sentence', () => {
    expect(toSentence(['Kitty', 'Duck', 'Possum', 'Mammoth'], 'and')).toEqual(
      'Kitty, Duck, Possum, and Mammoth'
    )
  })

  it('should return an empty string', () => {
    expect(toSentence([])).toEqual('')
  })

  it('should return a single word', () => {
    expect(toSentence(['Kitty'], 'and')).toEqual('Kitty')
  })
})
