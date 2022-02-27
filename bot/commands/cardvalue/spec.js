import command from '.'
const cardvalue = command.handler.bind(command)

describe('Bot — !cardvalue', () => {
  it('should return nothing for a missing term', () => {
    return cardvalue('').then(output => expect(output).toEqual(undefined))
  })

  it('should return min/max/avg fields', () => {
    return cardvalue('gifted').then(output => {
      expect(output.fields[0].name).toContain('Min')
      expect(output.fields[1].name).toContain('Max')
      expect(output.fields[2].name).toContain('Avg')
    })
  })
})
