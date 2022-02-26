import command from './'
const changelog = command.handler.bind(command)

describe('Bot — !changelog', () => {
  it('should return nothing for a missing term', () => {
    return changelog('').then(output => expect(output).toEqual(undefined))
  })

  it('should return content for a match', () => {
    return changelog('qoh').then(output =>
      expect(output.fields.length > 0).toEqual(true)
    )
  })

  it('should format dates', () => {
    return changelog('qoh').then(output => {
      const fields = output.fields.reverse()
      expect(fields[0].name).toContain('Sep')
      expect(fields[1].name).toContain('Nov')
    })
  })

  it('should return nothing for a no-match', () => {
    return changelog('flksdjf').then(output =>
      expect(output).toEqual(undefined)
    )
  })
})
