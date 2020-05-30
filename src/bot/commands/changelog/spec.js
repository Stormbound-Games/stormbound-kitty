import command from './'
const changelog = command.handler

describe('Bot — !changelog', () => {
  it('should return nothing for a missing term', () => {
    expect(changelog('')).to.equal(undefined)
    expect(changelog('  ')).to.equal(undefined)
  })

  it('should return content for a match', () => {
    expect(changelog('qoh')).to.contain('\n- ')
  })

  it('should format dates', () => {
    expect(changelog('qoh')).to.contain('Sep')
    expect(changelog('qoh')).to.contain('Nov')
  })

  it('should return nothing for a no-match', () => {
    expect(changelog('flksdjf')).to.equal(undefined)
  })
})
