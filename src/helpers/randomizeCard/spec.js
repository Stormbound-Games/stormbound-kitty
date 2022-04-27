import { TYPES, FACTIONS, RARITIES, UNIT_TYPES } from '~/constants/game'
import randomizeCard from './'

describe('The `randomizeCard` helper', () => {
  it('should return a valid card type', () => {
    expect(TYPES).toContain(randomizeCard().type)
  })

  it('should allow forcing the type', () => {
    TYPES.forEach(type => {
      expect(randomizeCard({ type }).type).toBe(type)
    })
  })

  it('should return a valid card faction', () => {
    expect(FACTIONS).toContain(randomizeCard().faction)
  })

  it('should allow forcing the factio', () => {
    FACTIONS.forEach(faction => {
      expect(randomizeCard({ faction }).faction).toBe(faction)
    })
  })

  it('should return a valid card rarity', () => {
    expect(RARITIES).toContain(randomizeCard().rarity)
  })

  it('should return a valid card race for unit cards', () => {
    expect(UNIT_TYPES).toContain(randomizeCard({ type: 'unit' }).unitTypes[0])
  })

  it('should return a capitalized ability', () => {
    const card = randomizeCard()
    expect(card.ability[0]).toEqual(card.ability[0].toUpperCase())
  })

  it('should return a name', () => {
    expect(randomizeCard().name.length).toBeGreaterThan(0)
  })
})
