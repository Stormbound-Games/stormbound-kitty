import command from './'
const decks = command.handler.bind(command)

describe('Bot — !decks', () => {
  it('should return the suggestions URL for an empty search', () => {
    expect(decks('').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions'
    )
  })

  it('should handle factions', () => {
    expect(decks('ironclad').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('shadowfen').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('winter').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('swarm').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
  })

  it('should handle tags', () => {
    expect(decks('high_levels').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=HIGH_LEVELS'
    )
    expect(decks('regular').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=REGULAR'
    )
    expect(decks('brawl').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=BRAWL'
    )
    expect(decks('equals').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=EQUALS'
    )
    expect(decks('equals brawl').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=EQUALS%2CBRAWL'
    )
  })

  it('should handle aliases', () => {
    expect(decks('d1').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=HIGH_LEVELS'
    )
    expect(decks('diamond').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=HIGH_LEVELS'
    )
    expect(decks('tournament').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=EQUALS'
    )
    expect(decks('tourney').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=EQUALS'
    )
    expect(decks('equal').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?tags=EQUALS'
    )
    expect(decks('ic').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('red').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('sf').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('green').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('w').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('wp').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('blue').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('sw').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
    expect(decks('yellow').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
  })

  it('should handle including cards', () => {
    expect(decks('I2').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?including=I2'
    )
    expect(decks('mia').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?including=I2'
    )
    expect(decks('rof').url).toEqual(
      'https://stormbound-kitty.com/deck/suggestions?including=F8'
    )
  })

  it('should handle multi-searches', () => {
    const [, search] = decks('ic mia diamond').url.split('?')
    const params = new URLSearchParams(search)
    expect(params.get('faction')).toEqual('ironclad')
    expect(params.get('tags')).toEqual('HIGH_LEVELS')
    expect(params.get('including')).toEqual('I2')
  })
})
