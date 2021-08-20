import command from './'
const cardinfo = command.handler.bind(command)

describe('Bot — !cardinfo', () => {
  it('should return nothing for a missing term', () => {
    expect(cardinfo('')).toEqual(undefined)
  })

  it('should return nothing for a single letter term', () => {
    expect(cardinfo('f')).toEqual(undefined)
  })

  it('should handle a Stormbound-Kitty ID', () => {
    expect(cardinfo('N1')).toEqual(
      'https://stormbound-kitty.com/card/N1/display'
    )
  })

  it('should handle a known card abbreviation', () => {
    expect(cardinfo('rof')).toEqual(
      'https://stormbound-kitty.com/card/F8/display'
    )
  })

  it('should handle a fuzzy search', () => {
    expect(cardinfo('king')).toContain(
      'https://stormbound-kitty.com/card/N69/display'
    )
    expect(cardinfo('king')).toContain(
      'https://stormbound-kitty.com/card/N73/display'
    )
  })

  it('should return nothing for a no-match', () => {
    expect(cardinfo('flksdjf')).toEqual(undefined)
  })
})
