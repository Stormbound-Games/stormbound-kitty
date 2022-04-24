import { TYPES, FACTIONS, RARITIES, RACES } from '~/constants/game'
import randomizeCard from './'

describe('The `randomizeCard` helper', () => {
  it('should return a valid card type', () => {
    expect(TYPES).toContain(randomizeCard().type)
  })

  it('should return a valid card faction', () => {
    expect(FACTIONS).toContain(randomizeCard().faction)
  })

  it('should return a valid card rarity', () => {
    expect(RARITIES).toContain(randomizeCard().rarity)
  })

  it.skip('should return a valid card race for unit cards', () => {
    expect(RACES).toContain(randomizeCard({ type: 'unit' }).race)
  })

  it('should return a capitalized ability', () => {
    const card = randomizeCard()
    expect(card.ability[0]).toEqual(card.ability[0].toUpperCase())
  })

  it('should return a name', () => {
    expect(randomizeCard().name.length).toBeGreaterThan(0)
  })
})
