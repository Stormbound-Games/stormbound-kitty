import command, { validateFaction, parseMessage } from './'
const randomdeck = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !randomdeck', () => {
  it('should return a random deck for an empty search', () => {
    expect(randomdeck('').url).to.contain(BASE_URL)
  })

  it('should handle factions', () => {
    expect(randomdeck('ironclad').url.replace(BASE_URL, '')).to.contain('i')
    expect(randomdeck('swarm').url.replace(BASE_URL, '')).to.contain('s')
    expect(randomdeck('winter').url.replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('shadowfen').url.replace(BASE_URL, '')).to.contain('f')
  })

  it('should handle aliases', () => {
    expect(randomdeck('ic').url.replace(BASE_URL, '')).to.contain('i')
    expect(randomdeck('red').url.replace(BASE_URL, '')).to.contain('i')
    expect(randomdeck('sw').url.replace(BASE_URL, '')).to.contain('s')
    expect(randomdeck('yellow').url.replace(BASE_URL, '')).to.contain('s')
    expect(randomdeck('w').url.replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('wp').url.replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('blue').url.replace(BASE_URL, '')).to.contain('w')
    expect(randomdeck('sf').url.replace(BASE_URL, '')).to.contain('f')
    expect(randomdeck('green').url.replace(BASE_URL, '')).to.contain('f')
  })

  it('should ignore unknown terms', () => {
    const outputA = randomdeck('ic foo bar').fields.pop().value
    const outputB = randomdeck('ic xxx, zzz').fields.pop().value

    expect(outputA).to.contain('foo bar')
    expect(outputB).to.contain('xxx')
    expect(outputB).to.contain('zzz')
  })

  it('should handle including a card', () => {
    expect(randomdeck('N48').url).to.contain('n48')
    expect(randomdeck('Earyn').url).to.contain('n48')
    expect(randomdeck('rof').url).to.contain('f8')
  })

  it('should handle including multiple cards', () => {
    expect(randomdeck('N48, N49').url).to.contain('n48n49')
    expect(randomdeck('Earyn, Avian').url).to.contain('n48n49')
    expect(randomdeck('rof,wyrm').url).to.contain('f8f9')
  })

  it('should return an error if conflicting arguments', () => {
    expect(randomdeck('ic rof').description).to.contain('conflicting')
    expect(randomdeck('fc, rof').description).to.contain('conflicting')
    expect(randomdeck('neutral').description).to.contain('conflicting')
  })

  describe('The `validateFaction` helper', () => {
    it('should prevent neutral faction', () => {
      expect(validateFaction('neutral')).to.equal(null)
    })

    it('should prevent including cards of multiple factions', () => {
      expect(
        validateFaction(null, [{ faction: 'shadowfen' }, { faction: 'winter' }])
      ).to.equal(null)
      expect(
        validateFaction(null, [
          { faction: 'shadowfen' },
          { faction: 'neutral' },
        ])
      ).to.not.equal(null)
    })

    it('should prevent including cards conflicting with the faction', () => {
      expect(validateFaction('shadowfen', [{ faction: 'winter' }])).to.equal(
        null
      )
    })

    it('should return faction if given', () => {
      expect(validateFaction('shadowfen')).to.equal('shadowfen')
    })

    it('should return faction of given card if no faction given', () => {
      expect(validateFaction(null, [{ faction: 'shadowfen' }])).to.equal(
        'shadowfen'
      )
    })

    it('should return a random faction otherwise', () => {
      expect(validateFaction()).to.not.equal('neutral')
      expect(typeof validateFaction()).to.equal('string')
    })
  })

  describe('The `parseMessage` helper', () => {
    it('should find the faction regardless of position', () => {
      expect(parseMessage('sf').faction).to.deep.equal({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('rof sf').faction).to.deep.equal({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('sf rof').faction).to.deep.equal({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('wotw, rof sf').faction).to.deep.equal({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('sf wotw, rof').faction).to.deep.equal({
        authored: 'sf',
        resolved: 'shadowfen',
      })
    })

    it('should find included cards', () => {
      expect(parseMessage('sf').including.length).to.equal(0)
      expect(parseMessage('rof sf').including.length).to.equal(1)
      expect(parseMessage('sf rof').including.length).to.equal(1)
      expect(parseMessage('wotw, rof sf').including.length).to.equal(2)
      expect(parseMessage('sf wotw, rof').including.length).to.equal(2)
      expect(parseMessage('pan herald').including.length).to.equal(1)
      expect(parseMessage('pan, herald').including.length).to.equal(2)
    })
  })
})
