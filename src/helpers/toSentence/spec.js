import toSentence from './'

describe('The `toSentence` helper', () => {
  it('should turn an array into a sentence', () => {
    expect(toSentence(['Kitty', 'Duck', 'Possum', 'Mammoth'])).toEqual(
      'Kitty, Duck, Possum, Mammoth'
    )
  })

  it('should handle different connectors', () => {
    expect(toSentence(['Kitty', 'Duck', 'Possum', 'Mammoth'], 'and')).toEqual(
      'Kitty, Duck, Possum, and Mammoth'
    )
    expect(toSentence(['Kitty', 'Duck', 'Possum', 'Mammoth'], 'or')).toEqual(
      'Kitty, Duck, Possum, or Mammoth'
    )
  })

  it('should return an empty string for an empty array', () => {
    expect(toSentence([])).toEqual('')
  })

  it('should return a single word for a single item array', () => {
    expect(toSentence(['Kitty'], 'and')).toEqual('Kitty')
  })

  it('should avoid the Oxford comma for arrays with 2 values', () => {
    expect(toSentence(['Kitty', 'Cat'], 'or')).toEqual('Kitty or Cat')
  })
})
