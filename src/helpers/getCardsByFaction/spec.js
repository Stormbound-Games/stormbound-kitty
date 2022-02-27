import getCardsByFaction from './'

describe.skip('The `getCardsByFaction` helper', () => {
  const output = getCardsByFaction()

  it('should return an object with factions as keys', () => {
    expect(output.swarm).not.toEqual(undefined)
    expect(output.winter).not.toEqual(undefined)
    expect(output.ironclad).not.toEqual(undefined)
    expect(output.shadowfen).not.toEqual(undefined)
  })

  it('should return an neutrals as a faction', () => {
    expect(output.neutral).not.toEqual(undefined)
  })

  it('should return an tokens as a faction', () => {
    expect(output.tokens).not.toEqual(undefined)
  })
})
