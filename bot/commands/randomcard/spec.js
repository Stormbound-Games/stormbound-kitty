import { FACTIONS, RACES, RARITIES, TYPES } from '~/constants/game'
import command from './'
import getRawCardData from '~/helpers/getRawCardData'
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
    expect(randomcard('')).toContain(BASE_URL)
  })

  it('should handle factions', () => {
    Object.keys(FACTIONS).forEach(faction => {
      const id = getCardId(randomcard(faction))
      expect(getRawCardData(id).faction).toEqual(faction)
    })
  })

  it('should handle negative factions', () => {
    Object.keys(FACTIONS).forEach(faction => {
      const id = getCardId(randomcard('!' + faction))
      expect(getRawCardData(id).faction).not.toEqual(faction)
    })
  })

  it('should handle types', () => {
    Object.keys(TYPES).forEach(type => {
      const id = getCardId(randomcard(type))
      expect(getRawCardData(id).type).toEqual(type)
    })
  })

  it('should handle negative types', () => {
    Object.keys(TYPES).forEach(type => {
      const id = getCardId(randomcard('!' + type))
      expect(getRawCardData(id).type).not.toEqual(type)
    })
  })

  it('should handle races', () => {
    Object.keys(RACES).forEach(race => {
      const id = getCardId(randomcard(race))
      expect(getRawCardData(id).race).toEqual(race)
    })
  })

  it('should handle negative races', () => {
    Object.keys(RACES).forEach(race => {
      const id = getCardId(randomcard('!' + race))
      expect(getRawCardData(id).race).not.toEqual(race)
    })
  })

  it('should handle rarities', () => {
    Object.keys(RARITIES).forEach(rarity => {
      const id = getCardId(randomcard(rarity))
      expect(getRawCardData(id).rarity).toEqual(rarity)
    })
  })

  it('should handle negative rarities', () => {
    Object.keys(RARITIES).forEach(rarity => {
      const id = getCardId(randomcard('!' + rarity))
      expect(getRawCardData(id).rarity).not.toEqual(rarity)
    })
  })

  it('should handle hero', () => {
    const id = getCardId(randomcard('hero'))
    expect(getRawCardData(id).hero).toEqual(true)
  })

  it('should handle negative hero', () => {
    const id = getCardId(randomcard('!hero'))
    expect(getRawCardData(id).hero).toEqual(undefined)
  })

  it('should handle ancient', () => {
    const id = getCardId(randomcard('ancient'))
    expect(getRawCardData(id).ancient).toEqual(true)
  })

  it('should handle negative ancient', () => {
    const id = getCardId(randomcard('!ancient'))
    expect(getRawCardData(id).ancient).toEqual(undefined)
  })

  it('should handle elder', () => {
    const id = getCardId(randomcard('elder'))
    expect(getRawCardData(id).elder).toEqual(true)
  })

  it('should handle negative elder', () => {
    const id = getCardId(randomcard('!elder'))
    expect(getRawCardData(id).elder).toEqual(undefined)
  })

  it('should handle aliases', () => {
    ALIASES.forEach(test => {
      const id = getCardId(randomcard(test.keyword))
      expect(getRawCardData(id)[test.key]).toEqual(test.value)
    })
  })

  it('should handle negative aliases', () => {
    ALIASES.forEach(test => {
      const id = getCardId(randomcard('!' + test.keyword))
      expect(getRawCardData(id)[test.key]).not.toEqual(test.value)
    })
  })

  it('should handle multi-searches', () => {
    const id = getCardId(randomcard('ic spell rare'))
    const card = getRawCardData(id)

    expect(card.faction).toEqual('ironclad')
    expect(card.type).toEqual('spell')
    expect(card.rarity).toEqual('rare')
  })

  it('should ignore unknown terms', () => {
    const output = getCardId(randomcard('ic foo spell bar rare'))

    expect(output).toContain('~~foo~~')
    expect(output).toContain('~~bar~~')
  })

  it('should return nothing for unknown search', () => {
    expect(getCardId(randomcard('foo bar'))).toEqual(undefined)
    expect(getCardId(randomcard('foo bar'))).toEqual(undefined)
  })
})
