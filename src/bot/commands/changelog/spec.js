import command from './'
const changelog = command.handler

describe('Bot — !changelog', () => {
  it('should return nothing for a missing term', () => {
    expect(changelog('')).to.equal(undefined)
  })

  it('should return content for a match', () => {
    expect(changelog('qoh').fields.length > 0).to.equal(true)
  })

  it('should format dates', () => {
    expect(changelog('qoh').fields.reverse()[0].name).to.contain('Sep')
    expect(changelog('qoh').fields.reverse()[1].name).to.contain('Nov')
  })

  it('should return nothing for a no-match', () => {
    expect(changelog('flksdjf')).to.equal(undefined)
  })
})
