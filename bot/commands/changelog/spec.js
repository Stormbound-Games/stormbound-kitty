import command from './'
const changelog = command.handler.bind(command)

describe('Bot — !changelog', () => {
  it('should return nothing for a missing term', () => {
    expect(changelog('')).toEqual(undefined)
  })

  it('should return content for a match', () => {
    expect(changelog('qoh').fields.length > 0).toEqual(true)
  })

  it('should format dates', () => {
    expect(changelog('qoh').fields.reverse()[0].name).toContain('Sep')
    expect(changelog('qoh').fields.reverse()[1].name).toContain('Nov')
  })

  it('should return nothing for a no-match', () => {
    expect(changelog('flksdjf')).toEqual(undefined)
  })
})
