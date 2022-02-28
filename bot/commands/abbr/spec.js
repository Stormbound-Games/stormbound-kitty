import command from './'
const abbr = command.handler.bind(command)

describe('Bot — !abbr', () => {
  it('should return nothing for a missing term', () => {
    return abbr('  ').then(output => expect(output).toEqual(undefined))
  })

  it('should handle an abbreviation with a single definition', () => {
    return abbr('VotM').then(output =>
      expect(output.description).toContain('Victors of the Melee')
    )
  })

  it('should discard casing entirely', () => {
    return abbr('aoe').then(output =>
      expect(output.description).toContain('Area of Effect')
    )
  })

  it('should handle an abbreviation with multiple definitions', () => {
    return abbr('fs').then(output => {
      expect(output.description).toContain('Fusion Stones')
      expect(output.description).toContain('Forgotten Souls')
    })
  })

  it('should return nothing for a no-match', () => {
    return abbr('flksdjf').then(output => expect(output).toEqual(undefined))
  })
})
