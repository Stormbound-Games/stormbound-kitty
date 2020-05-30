import command from './'
const randomdeck = command.handler

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !randomdeck', () => {
  it('should return a random deck for an empty search', () => {
    expect(randomdeck('')).to.contain(BASE_URL)
    expect(randomdeck('  ')).to.contain(BASE_URL)
  })

  it('should handle factions', () => {
    expect(randomdeck('ironclad').replace(BASE_URL, '')).to.contain('i')
    expect(randomdeck('swarm').replace(BASE_URL, '')).to.contain('s')
    expect(randomdeck('winter').replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('shadowfen').replace(BASE_URL, '')).to.contain('f')
  })

  it('should handle aliases', () => {
    expect(randomdeck('ic').replace(BASE_URL, '')).to.contain('i')
    expect(randomdeck('red').replace(BASE_URL, '')).to.contain('i')
    expect(randomdeck('sw').replace(BASE_URL, '')).to.contain('s')
    expect(randomdeck('yellow').replace(BASE_URL, '')).to.contain('s')
    expect(randomdeck('w').replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('wp').replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('blue').replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('sf').replace(BASE_URL, '')).to.contain('f')
    expect(randomdeck('green').replace(BASE_URL, '')).to.contain('f')
  })

  it('should ignore unknown terms', () => {
    const output = randomdeck('ic foo bar')

    expect(output).to.contain('~~foo~~')
    expect(output).to.contain('~~bar~~')
  })
})
