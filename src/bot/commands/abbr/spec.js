import abbr from './'

describe('Bot — !abbr', () => {
  it('should return nothing for a missing term', () => {
    expect(abbr('')).to.equal(undefined)
    expect(abbr('  ')).to.equal(undefined)
  })

  it('should handle an abbreviation with a single definition', () => {
    expect(abbr('VotM')).to.contain('Victors of the Melee')
  })

  it('should discard casing entirely', () => {
    expect(abbr('aoe')).to.contain('Area of Effect')
  })

  it('should handle an abbreviation with multiple definitions', () => {
    expect(abbr('fs')).to.contain('Fusion Stones')
    expect(abbr('fs')).to.contain('Forgotten Souls')
  })

  it('should return nothing for a no-match', () => {
    expect(abbr('flksdjf')).to.equal(undefined)
  })
})
