import resolveAbility from './index.js'

describe('The `resolveAbility` helper', () => {
  it('should handle null case', () => {
    const ability = null

    expect(resolveAbility(ability)).toEqual({
      values: [ability, ability, ability, ability, ability],
      display: ability,
    })
  })

  it('should leave untouched a simple ability', () => {
    const ability = 'This is the ability'

    expect(resolveAbility(ability)).toEqual({
      values: [ability, ability, ability, ability, ability],
      display: ability,
    })
  })

  it('should unfold values surrounded by spaces', () => {
    const resolved = resolveAbility('Deals 1/2/3/4/5 damage')
    expect(resolved.display).toEqual('Deals 1/2/3/4/5 damage')
    expect(resolved.values).toEqual([
      'Deals 1 damage',
      'Deals 2 damage',
      'Deals 3 damage',
      'Deals 4 damage',
      'Deals 5 damage',
    ])
  })

  it('should unfold values surrounded by commas', () => {
    const resolved = resolveAbility('Deals 1/2/3/4/5, damage')
    expect(resolved.display).toEqual('Deals 1/2/3/4/5, damage')
    expect(resolved.values).toEqual([
      'Deals 1, damage',
      'Deals 2, damage',
      'Deals 3, damage',
      'Deals 4, damage',
      'Deals 5, damage',
    ])
  })

  it('should unfold values surrounded by *', () => {
    const resolved = resolveAbility('Deals *1/2/3/4/5* damage')
    expect(resolved.display).toEqual('Deals *1/2/3/4/5* damage')
    expect(resolved.values).toEqual([
      'Deals *1* damage',
      'Deals *2* damage',
      'Deals *3* damage',
      'Deals *4* damage',
      'Deals *5* damage',
    ])
  })

  it('should unfold copied values', () => {
    const resolved = resolveAbility('Buff *bordering/~/~/surrounding/~* units')
    expect(resolved.display).toEqual('Buff *bordering/~/~/surrounding/~* units')
    expect(resolved.values).toEqual([
      'Buff *bordering* units',
      'Buff *bordering* units',
      'Buff *bordering* units',
      'Buff *surrounding* units',
      'Buff *surrounding* units',
    ])
  })

  it('should unfold multiple values', () => {
    const resolved = resolveAbility(
      'Deals 1/2/3/4/5 damage, and gain 2/3/4/5/6 strength'
    )
    expect(resolved.display).toEqual(
      'Deals 1/2/3/4/5 damage, and gain 2/3/4/5/6 strength'
    )
    expect(resolved.values).toEqual([
      'Deals 1 damage, and gain 2 strength',
      'Deals 2 damage, and gain 3 strength',
      'Deals 3 damage, and gain 4 strength',
      'Deals 4 damage, and gain 5 strength',
      'Deals 5 damage, and gain 6 strength',
    ])
  })
})
