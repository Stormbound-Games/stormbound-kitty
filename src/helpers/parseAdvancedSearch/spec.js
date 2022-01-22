import parse from './'
import { RACES, TYPES, FACTIONS, RARITIES } from '~/constants/game'

describe('The `parseAdvancedSearch` helper', () => {
  it('should handle empty searches', () => {
    expect(parse('')).toEqual({})
  })

  it('should handle races', () => {
    Object.keys(RACES).forEach(race => {
      expect(parse('is:' + race)).toEqual({ race })
    })
  })

  it('should handle types', () => {
    Object.keys(TYPES).forEach(type => {
      expect(parse('is:' + type)).toEqual({ type })
    })
  })

  it('should handle factions', () => {
    Object.keys(FACTIONS).forEach(faction => {
      expect(parse('is:' + faction)).toEqual({ faction })
    })
  })

  it('should handle rarities', () => {
    Object.keys(RARITIES).forEach(rarity => {
      expect(parse('is:' + rarity)).toEqual({ rarity })
    })
  })

  it('should handle modifiers', () => {
    expect(parse('is:hero')).toEqual({ hero: true })
    expect(parse('is:elder')).toEqual({ elder: true })
    expect(parse('is:ancient')).toEqual({ ancient: true })
  })

  it('should be case-insensitive', () => {
    expect(parse('is:HERO')).toEqual({ hero: true })
    expect(parse('is:eLdEr')).toEqual({ elder: true })
  })

  it('should handle aliases', () => {
    expect(parse('is:wp')).toEqual({ faction: 'winter' })
  })

  it('should handle equal signs', () => {
    expect(parse('is=neutral')).toEqual({ faction: 'neutral' })
  })

  it('should ignore non-card searches', () => {
    expect(parse('is:d1')).toEqual({})
    expect(parse('is:equals')).toEqual({})
  })

  it('should handle mana', () => {
    expect(parse('man:5')).toEqual({ mana: 5 })
    expect(parse('mana:5')).toEqual({ mana: 5 })
    expect(parse('mana:>5')).toEqual({ mana: '6-Infinity' })
    expect(parse('mana:>=5')).toEqual({ mana: '5-Infinity' })
    expect(parse('mana:5+')).toEqual({ mana: '5-Infinity' })
    expect(parse('mana:5-')).toEqual({ mana: '0-5' })
    expect(parse('mana:<5')).toEqual({ mana: '0-4' })
    expect(parse('mana:<=5')).toEqual({ mana: '0-5' })
    expect(parse('mana:4-8')).toEqual({ mana: '4-8' })
  })

  it('should handle strength', () => {
    expect(parse('strength:5')).toEqual({ strength: 5 })
    expect(parse('str:5')).toEqual({ strength: 5 })
    expect(parse('str:>5')).toEqual({ strength: '6-Infinity' })
    expect(parse('str:>=5')).toEqual({ strength: '5-Infinity' })
    expect(parse('str:5+')).toEqual({ strength: '5-Infinity' })
    expect(parse('str:5-')).toEqual({ strength: '0-5' })
    expect(parse('str:<5')).toEqual({ strength: '0-4' })
    expect(parse('str:<=5')).toEqual({ strength: '0-5' })
    expect(parse('str:4-8')).toEqual({ strength: '4-8' })
  })

  it('should handle movement', () => {
    expect(parse('spe:2')).toEqual({ movement: 2 })
    expect(parse('speed:2')).toEqual({ movement: 2 })
    expect(parse('movement:2')).toEqual({ movement: 2 })
    expect(parse('mov:2')).toEqual({ movement: 2 })
    expect(parse('mov:>2')).toEqual({ movement: '3-Infinity' })
    expect(parse('mov:>=2')).toEqual({ movement: '2-Infinity' })
    expect(parse('mov:2+')).toEqual({ movement: '2-Infinity' })
    expect(parse('mov:2-')).toEqual({ movement: '0-2' })
    expect(parse('mov:<2')).toEqual({ movement: '0-1' })
    expect(parse('mov:<=2')).toEqual({ movement: '0-2' })
    expect(parse('mov:0-2')).toEqual({ movement: '0-2' })
  })

  it('should ignore invalid numeric values', () => {
    expect(parse('mana:a-b')).toEqual({})
    expect(parse('mana:a---')).toEqual({})
    expect(parse('mana:5+-')).toEqual({})
    expect(parse('mana:foo')).toEqual({})
  })

  it('should handle abilities', () => {
    expect(parse('has:poison')).toEqual({ ability: 'POISON' })
    expect(parse('has:spawn')).toEqual({ ability: 'SPAWN' })
    expect(parse('has:drain')).toEqual({ ability: 'DRAIN' })
    expect(parse('has:confusion')).toEqual({ ability: 'CONFUSION' })
    expect(parse('has:surviving')).toEqual({ ability: 'SURVIVING' })
    expect(parse('has:vitality')).toEqual({ ability: 'VITALITY' })
    expect(parse('has:disable')).toEqual({ ability: 'DISABLE' })
    expect(parse('has:attacking')).toEqual({ ability: 'ATTACKING' })
    expect(parse('has:moving')).toEqual({ ability: 'MOVING' })
    expect(parse('has:on_death')).toEqual({ ability: 'ON_DEATH' })
    expect(parse('has:push_pull')).toEqual({ ability: 'PUSH_PULL' })
    expect(parse('has:push')).toEqual({ ability: 'PUSH' })
    expect(parse('has:pull')).toEqual({ ability: 'PULL' })
    expect(parse('has:command')).toEqual({ ability: 'COMMAND' })
    expect(parse('has:chip')).toEqual({ ability: 'CHIP' })
    expect(parse('has:freeze')).toEqual({ ability: 'FREEZE' })
  })
})
