import command from './'
const cardinfo = command.handler.bind(command)

describe('Bot — !cardinfo', () => {
  it('should return nothing for a missing term', () => {
    return cardinfo('').then(output => expect(output).toEqual(undefined))
  })

  it('should return nothing for a single letter term', () => {
    return cardinfo('f').then(output => expect(output).toEqual(undefined))
  })

  it('should handle a Stormbound-Kitty ID', () => {
    return cardinfo('N1').then(output =>
      expect(output).toEqual('https://stormbound-kitty.com/card/N1/display')
    )
  })

  it('should handle a known card abbreviation', () => {
    return cardinfo('rof').then(output =>
      expect(output).toEqual('https://stormbound-kitty.com/card/F8/display')
    )
  })

  it('should handle a fuzzy search', () => {
    return cardinfo('king').then(output => {
      expect(output).toContain('https://stormbound-kitty.com/card/N69/display')
      expect(output).toContain('https://stormbound-kitty.com/card/N73/display')
    })
  })

  it('should return nothing for a no-match', () => {
    return cardinfo('flksdjf').then(output => expect(output).toEqual(undefined))
  })
})
