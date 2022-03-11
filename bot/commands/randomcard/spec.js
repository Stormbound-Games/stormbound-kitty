import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import command from './'

const randomcard = command.handler.bind(command)

const BASE_URL = 'https://stormbound-kitty.com/card/'
const ALIASES = [
  { keyword: 'struct', key: 'type', value: 'structure' },
  { keyword: 'ic', key: 'faction', value: 'ironclad' },
  { keyword: 'red', key: 'faction', value: 'ironclad' },
  { keyword: 'sf', key: 'faction', value: 'shadowfen' },
  { keyword: 'green', key: 'faction', value: 'shadowfen' },
  { keyword: 'w', key: 'faction', value: 'winter' },
  { keyword: 'wp', key: 'faction', value: 'winter' },
  { keyword: 'blue', key: 'faction', value: 'winter' },
  { keyword: 'sw', key: 'faction', value: 'swarm' },
  { keyword: 'yellow', key: 'faction', value: 'swarm' },
]

const getCardId = url =>
  url ? url.replace(BASE_URL, '').replace('/display', '') : url

describe('Bot — !randomcard', () => {
  it('should return a random card for an empty search', () => {
    return randomcard('').then(output => expect(output).toContain(BASE_URL))
  })

  it('should handle factions', () => {
    const faction = FACTIONS[0]

    return randomcard(faction).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].faction).toEqual(faction)
    })
  })

  it('should handle negative factions', () => {
    const faction = FACTIONS[0]

    return randomcard('!' + faction).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].faction).not.toEqual(faction)
    })
  })

  it('should handle types', () => {
    const type = TYPES[0]

    return randomcard(type).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].type).toEqual(type)
    })
  })

  it('should handle negative types', () => {
    const type = TYPES[0]

    return randomcard('!' + type).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].type).not.toEqual(type)
    })
  })

  it('should handle races', () => {
    const race = RACES[0]

    return randomcard(race).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].race).toEqual(race)
    })
  })

  it('should handle negative races', () => {
    const race = RACES[0]

    return randomcard('!' + race).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].race).not.toEqual(race)
    })
  })

  it('should handle rarities', () => {
    const rarity = RARITIES[0]

    return randomcard(rarity).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].rarity).toEqual(rarity)
    })
  })

  it('should handle negative rarities', () => {
    const rarity = RARITIES[0]

    return randomcard('!' + rarity).then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].rarity).not.toEqual(rarity)
    })
  })

  it('should handle hero', () => {
    return randomcard('hero').then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].hero).toEqual(true)
    })
  })

  it('should handle negative hero', () => {
    return randomcard('!hero').then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].hero).toEqual(false)
    })
  })

  it('should handle ancient', () => {
    return randomcard('ancient').then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].ancient).toEqual(true)
    })
  })

  it('should handle negative ancient', () => {
    return randomcard('!ancient').then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].ancient).toEqual(false)
    })
  })

  it('should handle elder', () => {
    return randomcard('elder').then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].elder).toEqual(true)
    })
  })

  it('should handle negative elder', () => {
    return randomcard('!elder').then(output => {
      const id = getCardId(output)
      expect(global.__CARDS_INDEX__[id].elder).toEqual(false)
    })
  })

  it.skip('should handle aliases', () => {
    ALIASES.forEach(test => {
      const id = getCardId(randomcard(test.keyword))
      expect(global.__CARDS_INDEX__[id][test.key]).toEqual(test.value)
    })
  })

  it.skip('should handle negative aliases', () => {
    ALIASES.forEach(test => {
      const id = getCardId(randomcard('!' + test.keyword))
      expect(global.__CARDS_INDEX__[id][test.key]).not.toEqual(test.value)
    })
  })

  it('should handle multi-searches', () => {
    return randomcard('ic spell rare').then(output => {
      const id = getCardId(output)
      const card = global.__CARDS_INDEX__[id]

      expect(card.faction).toEqual('ironclad')
      expect(card.type).toEqual('spell')
      expect(card.rarity).toEqual('rare')
    })
  })

  it('should ignore unknown terms', () => {
    return randomcard('ic foo spell bar rare').then(output => {
      const id = getCardId(output)

      expect(id).toContain('~~foo~~')
      expect(id).toContain('~~bar~~')
    })
  })

  it('should return nothing for unknown search', () => {
    return randomcard('foo bar').then(output =>
      expect(getCardId(output)).toEqual(undefined)
    )
  })
})
