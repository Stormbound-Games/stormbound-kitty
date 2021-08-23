import command from './'
const abbr = command.handler.bind(command)

describe('Bot — !abbr', () => {
  it('should return nothing for a missing term', () => {
    expect(abbr('')).toEqual(undefined)
    expect(abbr('  ')).toEqual(undefined)
  })

  it('should handle an abbreviation with a single definition', () => {
    expect(abbr('VotM').description).toContain('Victors of the Melee')
  })

  it('should discard casing entirely', () => {
    expect(abbr('aoe').description).toContain('Area of Effect')
  })

  it('should handle an abbreviation with multiple definitions', () => {
    expect(abbr('fs').description).toContain('Fusion Stones')
    expect(abbr('fs').description).toContain('Forgotten Souls')
  })

  it('should return nothing for a no-match', () => {
    expect(abbr('flksdjf')).toEqual(undefined)
  })
})
