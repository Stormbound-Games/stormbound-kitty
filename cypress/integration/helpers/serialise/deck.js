import {
  serialiseDeck,
  serialiseCards,
} from '../../../../src/helpers/serialise'

describe('The `serialiseDeck` helper', () => {
  it('should serialise some cards', () => {
    expect(serialiseCards([{ level: 1, id: 'N1' }])).to.equal('1N1')
  })

  it('should handle tokens with a forced padding', () => {
    expect(
      serialiseCards([
        { level: 1, id: 'T1', token: true },
        { level: 10, id: 'T2', token: true },
      ])
    ).to.equal('01T110T2')
  })

  it('should strip out empty cards', () => {
    expect(serialiseCards([{ level: 1, id: 'N1' }, null, {}])).to.equal('1N1')
  })

  it('should be a btoa wrapper around `serialisedCards`', () => {
    expect(serialiseDeck([{ level: 1, id: 'N1' }])).to.equal(
      btoa(serialiseCards([{ level: 1, id: 'N1' }]))
    )
  })
})
