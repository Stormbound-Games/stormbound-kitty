import command from '.'
const cardvalue = command.handler.bind(command)

describe('Bot — !cardvalue', () => {
  it('should return nothing for a missing term', () => {
    expect(cardvalue('')).to.equal(undefined)
  })

  it('should return min/max/avg fields', () => {
    expect(cardvalue('gifted').fields[0].name).to.contain('Min')
    expect(cardvalue('gifted').fields[1].name).to.contain('Max')
    expect(cardvalue('gifted').fields[2].name).to.contain('Avg')
  })
})
