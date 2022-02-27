import command, { validateFaction, parseMessage } from './'
const randomdeck = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !randomdeck', () => {
  it('should return a random deck for an empty search', () => {
    return randomdeck('').then(output => expect(output).toContain(BASE_URL))
  })

  it('should handle factions', () => {
    return Promise.all([
      randomdeck('ironclad'),
      randomdeck('swarm'),
      randomdeck('winter'),
      randomdeck('shadowfen'),
    ]).then(outputs => {
      expect(outputs[0].replace(BASE_URL, '')).toContain('i')
      expect(outputs[1].replace(BASE_URL, '')).toContain('s')
      expect(outputs[2].replace(BASE_URL, '')).toContain('w')
      expect(outputs[3].replace(BASE_URL, '')).toContain('f')
    })
  })

  it('should handle aliases', () => {
    return Promise.all([
      randomdeck('ic'),
      randomdeck('red'),
      randomdeck('sw'),
      randomdeck('yellow'),
      randomdeck('w'),
      randomdeck('wp'),
      randomdeck('blue'),
      randomdeck('sf'),
      randomdeck('green'),
    ]).then(outputs => {
      expect(outputs[0].replace(BASE_URL, '')).toContain('i')
      expect(outputs[1].replace(BASE_URL, '')).toContain('i')
      expect(outputs[2].replace(BASE_URL, '')).toContain('s')
      expect(outputs[3].replace(BASE_URL, '')).toContain('s')
      expect(outputs[4].replace(BASE_URL, '')).toContain('w')
      expect(outputs[5].replace(BASE_URL, '')).toContain('w')
      expect(outputs[6].replace(BASE_URL, '')).toContain('w')
      expect(outputs[7].replace(BASE_URL, '')).toContain('f')
      expect(outputs[8].replace(BASE_URL, '')).toContain('f')
    })
  })

  it('should handle including a card', () => {
    return Promise.all([
      randomdeck('N48'),
      randomdeck('Earyn'),
      randomdeck('rof'),
    ]).then(outputs => {
      expect(outputs[0].replace(BASE_URL, '')).toContain('n48')
      expect(outputs[1].replace(BASE_URL, '')).toContain('n48')
      expect(outputs[2].replace(BASE_URL, '')).toContain('f8')
    })
  })

  it('should handle including multiple cards', () => {
    return Promise.all([
      randomdeck('N48, N49'),
      randomdeck('Earyn, Avian'),
      randomdeck('rof,wyrm'),
    ]).then(outputs => {
      expect(outputs[0].replace(BASE_URL, '')).toContain('n48')
      expect(outputs[0].replace(BASE_URL, '')).toContain('n49')
      expect(outputs[1].replace(BASE_URL, '')).toContain('n48')
      expect(outputs[1].replace(BASE_URL, '')).toContain('n49')
      expect(outputs[2].replace(BASE_URL, '')).toContain('f8')
      expect(outputs[2].replace(BASE_URL, '')).toContain('f9')
    })
  })

  it('should return an error if conflicting arguments', () => {
    return Promise.all([
      randomdeck('ic rof'),
      randomdeck('fc, rof'),
      randomdeck('neutral'),
    ]).then(outputs => {
      expect(outputs[0].description).toContain('conflicting')
      expect(outputs[1].description).toContain('conflicting')
      expect(outputs[2].description).toContain('conflicting')
    })
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
      expect(parseMessage(global.__CARDS__, 'sf').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage(global.__CARDS__, 'rof sf').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage(global.__CARDS__, 'sf rof').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage(global.__CARDS__, 'wotw, rof sf').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
      expect(parseMessage(global.__CARDS__, 'sf wotw, rof').faction).toEqual({
        authored: 'sf',
        resolved: 'shadowfen',
      })
    })

    it('should find included cards', () => {
      expect(parseMessage(global.__CARDS__, 'sf').including.length).toEqual(0)
      expect(parseMessage(global.__CARDS__, 'rof sf').including.length).toEqual(
        1
      )
      expect(parseMessage(global.__CARDS__, 'sf rof').including.length).toEqual(
        1
      )
      expect(
        parseMessage(global.__CARDS__, 'wotw, rof sf').including.length
      ).toEqual(2)
      expect(
        parseMessage(global.__CARDS__, 'sf wotw, rof').including.length
      ).toEqual(2)
      expect(
        parseMessage(global.__CARDS__, 'pan herald').including.length
      ).toEqual(1)
      expect(
        parseMessage(global.__CARDS__, 'pan, herald').including.length
      ).toEqual(2)
    })
  })
})
