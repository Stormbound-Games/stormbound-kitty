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

  it('should return a valid card race', () => {
    expect(RACES).toContain(randomizeCard().race)
  })
})
