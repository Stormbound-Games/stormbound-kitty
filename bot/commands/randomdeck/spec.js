import command, { validateFaction, parseMessage } from './'
const randomdeck = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !randomdeck', () => {
  it('should return a random deck for an empty search', () => {
    expect(randomdeck('')).toContain(BASE_URL)
  })

  it('should handle factions', () => {
    expect(randomdeck('ironclad').replace(BASE_URL, '')).toContain('i')
    expect(randomdeck('swarm').replace(BASE_URL, '')).toContain('s')
    expect(randomdeck('winter').replace(BASE_URL, '')).toContain('w')
    expect(randomdeck('shadowfen').replace(BASE_URL, '')).toContain('f')
  })

  it('should handle aliases', () => {
    expect(randomdeck('ic').replace(BASE_URL, '')).toContain('i')
    expect(randomdeck('red').replace(BASE_URL, '')).toContain('i')
    expect(randomdeck('sw').replace(BASE_URL, '')).toContain('s')
    expect(randomdeck('yellow').replace(BASE_URL, '')).toContain('s')
    expect(randomdeck('w').replace(BASE_URL, '')).toContain('w')
    expect(randomdeck('wp').replace(BASE_URL, '')).toContain('w')
    expect(randomdeck('blue').replace(BASE_URL, '')).toContain('w')
    expect(randomdeck('sf').replace(BASE_URL, '')).toContain('f')
    expect(randomdeck('green').replace(BASE_URL, '')).toContain('f')
  })

  it('should handle including a card', () => {
    expect(randomdeck('N48')).toContain('n48')
    expect(randomdeck('Earyn')).toContain('n48')
    expect(randomdeck('rof')).toContain('f8')
  })

  it('should handle including multiple cards', () => {
    expect(randomdeck('N48, N49')).toContain('n48n49')
    expect(randomdeck('Earyn, Avian')).toContain('n48n49')
    expect(randomdeck('rof,wyrm')).toContain('f8f9')
  })

  it('should return an error if conflicting arguments', () => {
    expect(randomdeck('ic rof').description).toContain('conflicting')
    expect(randomdeck('fc, rof').description).toContain('conflicting')
    expect(randomdeck('neutral').description).toContain('conflicting')
  })

  describe('The `validateFaction` helper', () => {
    it('should prevent neutral faction', () => {
      expect(validateFaction('neutral')).toEqual(null)
    })

    it('should prevent including cards of multiple factions', () => {
      expect(
        validateFaction(null, [{ faction: 'shadowfen' }, { faction: 'winter' }])
      ).toEqual(null)
      expect(
        validateFaction(null, [
          { faction: 'shadowfen' },
          { faction: 'neutral' },
        ])
      ).not.toEqual(null)
    })

    it('should prevent including cards conflicting with the faction', () => {
      expect(validateFaction('shadowfen', [{ faction: 'winter' }])).toEqual(
        null
      )
    })

    it('should return faction if given', () => {
      expect(validateFaction('shadowfen')).toEqual('shadowfen')
    })

    it('should return faction of given card if no faction given', () => {
      expect(validateFaction(null, [{ faction: 'shadowfen' }])).toEqual(
        'shadowfen'
      )
    })

    it('should return a random faction otherwise', () => {
      expect(validateFaction()).not.toEqual('neutral')
      expect(typeof validateFaction()).toEqual('string')
    })
  })

  describe('The `parseMessage` helper', () => {
    it('should find the faction regardless of position', () => {
      expect(parseMessage('sf').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('rof sf').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('sf rof').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('wotw, rof sf').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage('sf wotw, rof').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
    })

    it('should find included cards', () => {
      expect(parseMessage('sf').including.length).toEqual(0)
      expect(parseMessage('rof sf').including.length).toEqual(1)
      expect(parseMessage('sf rof').including.length).toEqual(1)
      expect(parseMessage('wotw, rof sf').including.length).toEqual(2)
      expect(parseMessage('sf wotw, rof').including.length).toEqual(2)
      expect(parseMessage('pan herald').including.length).toEqual(1)
      expect(parseMessage('pan, herald').including.length).toEqual(2)
    })
  })
})
