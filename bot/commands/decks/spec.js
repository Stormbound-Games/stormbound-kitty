import command from './'
const decks = command.handler.bind(command)

describe('Bot — !decks', () => {
  it('should return the featured URL for an empty search', () => {
    return decks('').then(output =>
      expect(output.url).toEqual('https://stormbound-kitty.com/deck/featured')
    )
  })

  it('should handle factions', () => {
    return decks('ironclad').then(output => {
      expect(output.url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=ironclad'
      )
    })
  })

  it('should handle tags', () => {
    return Promise.all([
      decks('high_levels'),
      decks('regular'),
      decks('brawl'),
      decks('equals'),
      decks('equals brawl'),
    ]).then(outputs => {
      expect(outputs[0].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=HIGH_LEVELS'
      )
      expect(outputs[1].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=REGULAR'
      )
      expect(outputs[2].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=BRAWL'
      )
      expect(outputs[3].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=EQUALS'
      )
      expect(outputs[4].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=EQUALS%2CBRAWL'
      )
    })
  })

  it('should handle aliases', () => {
    return Promise.all([
      decks('d1'),
      decks('diamond'),
      decks('tournament'),
      decks('tourney'),
      decks('equal'),
      decks('ic'),
      decks('red'),
      decks('sf'),
      decks('green'),
      decks('w'),
      decks('wp'),
      decks('blue'),
      decks('sw'),
      decks('yellow'),
    ]).then(outputs => {
      expect(outputs[0].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=HIGH_LEVELS'
      )
      expect(outputs[1].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=HIGH_LEVELS'
      )
      expect(outputs[2].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=EQUALS'
      )
      expect(outputs[3].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=EQUALS'
      )
      expect(outputs[4].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?tags=EQUALS'
      )
      expect(outputs[5].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=ironclad'
      )
      expect(outputs[6].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=ironclad'
      )
      expect(outputs[7].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=shadowfen'
      )
      expect(outputs[8].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=shadowfen'
      )
      expect(outputs[9].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=winter'
      )
      expect(outputs[10].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=winter'
      )
      expect(outputs[11].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=winter'
      )
      expect(outputs[12].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=swarm'
      )
      expect(outputs[13].url).toEqual(
        'https://stormbound-kitty.com/deck/featured?faction=swarm'
      )
    })
  })

  it('should handle including cards', () => {
    return Promise.all([decks('I2'), decks('mia'), decks('rof')]).then(
      outputs => {
        expect(outputs[0].url).toEqual(
          'https://stormbound-kitty.com/deck/featured?including=I2'
        )
        expect(outputs[1].url).toEqual(
          'https://stormbound-kitty.com/deck/featured?including=I2'
        )
        expect(outputs[2].url).toEqual(
          'https://stormbound-kitty.com/deck/featured?including=F8'
        )
      }
    )
  })

  it('should handle multi-searches', () => {
    return decks('ic mia diamond').then(output => {
      const [, search] = output.url.split('?')
      const params = new URLSearchParams(search)
      expect(params.get('faction')).toEqual('ironclad')
      expect(params.get('tags')).toEqual('HIGH_LEVELS')
      expect(params.get('including')).toEqual('I2')
    })
  })
})
