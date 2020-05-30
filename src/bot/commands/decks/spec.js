import command from './'
const decks = command.handler

describe('Bot — !decks', () => {
  it('should return the suggestions URL for an empty search', () => {
    expect(decks('')).to.equal('https://stormbound-kitty.com/deck/suggestions')
  })

  it('should handle factions', () => {
    expect(decks('ironclad')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('shadowfen')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('winter')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('swarm')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
  })

  it('should handle categories', () => {
    expect(decks('diamond_1')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=DIAMOND_1'
    )
    expect(decks('regular')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=REGULAR'
    )
    expect(decks('brawl')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=BRAWL'
    )
    expect(decks('equals')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
  })

  it('should handle aliases', () => {
    expect(decks('d1')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=DIAMOND_1'
    )
    expect(decks('diamond')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=DIAMOND_1'
    )
    expect(decks('tournament')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
    expect(decks('tourney')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
    expect(decks('equal')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
    expect(decks('ic')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('red')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('sf')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('green')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('w')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('wp')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('blue')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('sw')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
    expect(decks('yellow')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
  })

  it('should handle including cards', () => {
    expect(decks('I2')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?including=I2'
    )
    expect(decks('mia')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?including=I2'
    )
    expect(decks('rof')).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?including=F8'
    )
  })

  it('should handle multi-searches', () => {
    const [, search] = decks('ic mia diamond').split('?')
    const params = new URLSearchParams(search)
    expect(params.get('faction')).to.equal('ironclad')
    expect(params.get('category')).to.equal('DIAMOND_1')
    expect(params.get('including')).to.equal('I2')
  })
})
