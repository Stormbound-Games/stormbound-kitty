import command from '.'
const cardvalue = command.handler.bind(command)

describe('Bot — !cardvalue', () => {
  it('should return nothing for a missing term', () => {
    expect(cardvalue('')).toEqual(undefined)
  })

  it('should return min/max/avg fields', () => {
    expect(cardvalue('gifted').fields[0].name).toContain('Min')
    expect(cardvalue('gifted').fields[1].name).toContain('Max')
    expect(cardvalue('gifted').fields[2].name).toContain('Avg')
  })
})
