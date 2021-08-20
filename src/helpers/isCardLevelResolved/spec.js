import isCardLevelResolved from './'

export default card =>
  // Name is there
  !!card.name &&
  // And if there is a strength, it doesn’t contain slashes
  (!card.strength ||
    (!!card.strength && !String(card.strength).includes('/'))) &&
  // And if there is an ability, it doesn’t contain slashes
  (!card.ability || (!!card.ability && !card.ability.includes('/'))) &&
  // And if there is a stringified mana, it doesn’t contain slashes
  (typeof card.mana === 'number' ||
    (typeof card.mana === 'string' && !card.mana.includes('/')))

describe('The `isCardLevelResolved` helper', () => {
  it('should return false if there is no card name', () => {
    expect(isCardLevelResolved({})).toEqual(false)
  })

  it('should return false if the strength contains slashes', () => {
    expect(isCardLevelResolved({ name: 'Foo', strength: '1/2/3/4/5' })).toEqual(
      false
    )
  })

  it('should return false if the ability contains slashes', () => {
    expect(
      isCardLevelResolved({
        name: 'Foo',
        strength: 4,
        ability: 'Foo a/b/c/d/e',
      })
    ).toEqual(false)
  })

  it('should return false if the mana contains slashes', () => {
    expect(
      isCardLevelResolved({
        name: 'Foo',
        strength: 4,
        ability: 'Foo d',
        mana: '1/2/3/4/5',
      })
    ).toEqual(false)
  })

  it('should return true otherwise', () => {
    expect(
      isCardLevelResolved({
        name: 'Foo',
        strength: 4,
        ability: 'Foo d',
        mana: 0,
      })
    ).toEqual(true)
  })
})
