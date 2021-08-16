import parse from './'
import { RACES, TYPES, FACTIONS, RARITIES } from '~/constants/game'

describe('The `parseAdvancedSearch` helper', () => {
  it('should handle empty searches', () => {
    expect(parse('')).to.deep.equal({})
  })

  it('should handle races', () => {
    Object.keys(RACES).forEach(race => {
      expect(parse('is:' + race)).to.deep.equal({ race })
    })
  })

  it('should handle types', () => {
    Object.keys(TYPES).forEach(type => {
      expect(parse('is:' + type)).to.deep.equal({ type })
    })
  })

  it('should handle factions', () => {
    Object.keys(FACTIONS).forEach(faction => {
      expect(parse('is:' + faction)).to.deep.equal({ faction })
    })
  })

  it('should handle rarities', () => {
    Object.keys(RARITIES).forEach(rarity => {
      expect(parse('is:' + rarity)).to.deep.equal({ rarity })
    })
  })

  it('should handle modifiers', () => {
    expect(parse('is:hero')).to.deep.equal({ hero: true })
    expect(parse('is:elder')).to.deep.equal({ elder: true })
  })

  it('should be case-insensitive', () => {
    expect(parse('is:HERO')).to.deep.equal({ hero: true })
    expect(parse('is:eLdEr')).to.deep.equal({ elder: true })
  })

  it('should handle aliases', () => {
    expect(parse('is:wp')).to.deep.equal({ faction: 'winter' })
  })

  it('should handle equal signs', () => {
    expect(parse('is=neutral')).to.deep.equal({ faction: 'neutral' })
  })

  it('should ignore non-card searches', () => {
    expect(parse('is:d1')).to.deep.equal({})
    expect(parse('is:equals')).to.deep.equal({})
  })

  it('should handle mana', () => {
    expect(parse('man:5')).to.deep.equal({ mana: 5 })
    expect(parse('mana:5')).to.deep.equal({ mana: 5 })
    expect(parse('mana:>5')).to.deep.equal({ mana: '6-Infinity' })
    expect(parse('mana:>=5')).to.deep.equal({ mana: '5-Infinity' })
    expect(parse('mana:5+')).to.deep.equal({ mana: '5-Infinity' })
    expect(parse('mana:5-')).to.deep.equal({ mana: '0-5' })
    expect(parse('mana:<5')).to.deep.equal({ mana: '0-4' })
    expect(parse('mana:<=5')).to.deep.equal({ mana: '0-5' })
    expect(parse('mana:4-8')).to.deep.equal({ mana: '4-8' })
  })

  it('should handle strength', () => {
    expect(parse('strength:5')).to.deep.equal({ strength: 5 })
    expect(parse('str:5')).to.deep.equal({ strength: 5 })
    expect(parse('str:>5')).to.deep.equal({ strength: '6-Infinity' })
    expect(parse('str:>=5')).to.deep.equal({ strength: '5-Infinity' })
    expect(parse('str:5+')).to.deep.equal({ strength: '5-Infinity' })
    expect(parse('str:5-')).to.deep.equal({ strength: '0-5' })
    expect(parse('str:<5')).to.deep.equal({ strength: '0-4' })
    expect(parse('str:<=5')).to.deep.equal({ strength: '0-5' })
    expect(parse('str:4-8')).to.deep.equal({ strength: '4-8' })
  })

  it('should handle movement', () => {
    expect(parse('spe:2')).to.deep.equal({ movement: 2 })
    expect(parse('speed:2')).to.deep.equal({ movement: 2 })
    expect(parse('movement:2')).to.deep.equal({ movement: 2 })
    expect(parse('mov:2')).to.deep.equal({ movement: 2 })
    expect(parse('mov:>2')).to.deep.equal({ movement: '3-Infinity' })
    expect(parse('mov:>=2')).to.deep.equal({ movement: '2-Infinity' })
    expect(parse('mov:2+')).to.deep.equal({ movement: '2-Infinity' })
    expect(parse('mov:2-')).to.deep.equal({ movement: '0-2' })
    expect(parse('mov:<2')).to.deep.equal({ movement: '0-1' })
    expect(parse('mov:<=2')).to.deep.equal({ movement: '0-2' })
    expect(parse('mov:0-2')).to.deep.equal({ movement: '0-2' })
  })

  it('should ignore invalid numeric values', () => {
    expect(parse('mana:a-b')).to.deep.equal({})
    expect(parse('mana:a---')).to.deep.equal({})
    expect(parse('mana:5+-')).to.deep.equal({})
    expect(parse('mana:foo')).to.deep.equal({})
  })

  it('should handle abilities', () => {
    expect(parse('has:poison')).to.deep.equal({ ability: 'POISON' })
    expect(parse('has:spawn')).to.deep.equal({ ability: 'SPAWN' })
    expect(parse('has:drain')).to.deep.equal({ ability: 'DRAIN' })
    expect(parse('has:confusion')).to.deep.equal({ ability: 'CONFUSION' })
    expect(parse('has:surviving')).to.deep.equal({ ability: 'SURVIVING' })
    expect(parse('has:vitality')).to.deep.equal({ ability: 'VITALITY' })
    expect(parse('has:disable')).to.deep.equal({ ability: 'DISABLE' })
    expect(parse('has:attacking')).to.deep.equal({ ability: 'ATTACKING' })
    expect(parse('has:on_death')).to.deep.equal({ ability: 'ON_DEATH' })
    expect(parse('has:push_pull')).to.deep.equal({ ability: 'PUSH_PULL' })
    expect(parse('has:push')).to.deep.equal({ ability: 'PUSH' })
    expect(parse('has:pull')).to.deep.equal({ ability: 'PULL' })
    expect(parse('has:command')).to.deep.equal({ ability: 'COMMAND' })
    expect(parse('has:chip')).to.deep.equal({ ability: 'CHIP' })
    expect(parse('has:freeze')).to.deep.equal({ ability: 'FREEZE' })
  })
})
