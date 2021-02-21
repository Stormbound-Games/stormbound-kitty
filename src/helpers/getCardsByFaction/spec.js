import getCardsByFaction from './'

describe('The `getCardsByFaction` helper', () => {
  const output = getCardsByFaction()

  it('should return an object with factions as keys', () => {
    expect(output.swarm).not.to.equal(undefined)
    expect(output.winter).not.to.equal(undefined)
    expect(output.ironclad).not.to.equal(undefined)
    expect(output.shadowfen).not.to.equal(undefined)
  })

  it('should return an neutrals as a faction', () => {
    expect(output.neutral).not.to.equal(undefined)
  })

  it('should return an tokens as a faction', () => {
    expect(output.tokens).not.to.equal(undefined)
  })
})
