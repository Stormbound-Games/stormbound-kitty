import command from './'
const suggestdeck = command.handler

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !suggestdeck', () => {
  it('should return a suggested deck for an empty search', () => {
    expect(suggestdeck('')).to.contain(BASE_URL)
    expect(suggestdeck('  ')).to.contain(BASE_URL)
  })

  it('should handle factions', () => {
    expect(suggestdeck('ironclad').replace(BASE_URL, '')).to.contain('i')
    expect(suggestdeck('swarm').replace(BASE_URL, '')).to.contain('s')
    expect(suggestdeck('winter').replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('shadowfen').replace(BASE_URL, '')).to.contain('f')
  })

  it('should handle aliases', () => {
    expect(suggestdeck('ic').replace(BASE_URL, '')).to.contain('i')
    expect(suggestdeck('red').replace(BASE_URL, '')).to.contain('i')
    expect(suggestdeck('sw').replace(BASE_URL, '')).to.contain('s')
    expect(suggestdeck('yellow').replace(BASE_URL, '')).to.contain('s')
    expect(suggestdeck('w').replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('wp').replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('blue').replace(BASE_URL, '')).to.contain('w')
    expect(suggestdeck('sf').replace(BASE_URL, '')).to.contain('f')
    expect(suggestdeck('green').replace(BASE_URL, '')).to.contain('f')
  })

  it('should handle multi-searches', () => {})

  it('should ignore unknown terms', () => {
    const output = suggestdeck('ic foobar')

    expect(output).to.contain('~~foobar~~')
  })
})
