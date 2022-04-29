import getCardBuilderMetaTags from './'

describe('The `getCardBuilderMetaTags` helper', () => {
  it('should return the name as title if provided', () => {
    expect(
      getCardBuilderMetaTags(global.__CARDS_INDEX__, { name: 'Foo' }).title
    ).toBe('Foo')
  })

  it('should return a fallback title otherwise', () => {
    expect(getCardBuilderMetaTags(global.__CARDS_INDEX__, {}).title).toBe(
      'Card Builder'
    )
  })

  it('should return the image URL as image if provided', () => {
    expect(
      getCardBuilderMetaTags(global.__CARDS_INDEX__, {
        imageURL: 'https://i.imgur.com/nLtdfAg.png',
      }).image
    ).toBe('https://i.imgur.com/nLtdfAg.png')
  })

  it('should return the card’s image if valid', () => {
    expect(
      getCardBuilderMetaTags(global.__CARDS_INDEX__, {
        imageCardId: 'S2',
      }).image
    ).toBe(
      'https://cdn.sanity.io/images/5hlpazgd/production/acd2a07b8a65b920b41af9b63bcbdbb19f6429a0-512x512.png'
    )
  })

  it('should discard the card image ID if invalid', () => {
    expect(
      getCardBuilderMetaTags(global.__CARDS_INDEX__, {
        imageCardId: 'foo',
      }).image
    ).toBeUndefined()
  })

  it('should return the card stats as description if provided', () => {
    expect(
      getCardBuilderMetaTags(global.__CARDS_INDEX__, {
        name: 'Foo',
        mana: { display: '1' },
        type: 'spell',
        unitTypes: [],
        ability: { display: '' },
      }).description
    ).toEqual(expect.stringContaining('Foo'))
  })

  it('should return a fallback description otherwise', () => {
    expect(
      getCardBuilderMetaTags(global.__CARDS_INDEX__, {
        name: 'Foo',
        mana: { display: '1' },
        type: 'unit',
        unitTypes: [],
        ability: { display: '' },
      }).description
    ).toEqual('Create your own Stormbound card')
  })
})
