import isCardLevelResolved from './'

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
