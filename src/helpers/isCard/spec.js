import isCard from './'

describe('The `isCard` helper', () => {
  ;[
    { card1: null, card2: null, result: true },
    { card1: null, card2: { id: 'N1' }, result: false },
    { card1: { id: 'N1' }, card2: { id: 'N1' }, result: true },
    { card1: { id: 'N1' }, card2: { id: 'N2' }, result: false },
    { card1: { id: 'N1', idx: '0' }, card2: null, result: false },
    { card1: { id: 'N1', idx: '0' }, card2: { id: 'N1' }, result: true },
    { card1: { id: 'N1', idx: '1' }, card2: { id: 'N1' }, result: false },
    {
      card1: { id: 'N1', idx: '1' },
      card2: { id: 'N1', idx: '1' },
      result: true,
    },
    {
      card1: { id: 'N1', idx: '1' },
      card2: { id: 'N1', idx: '2' },
      result: false,
    },
  ].forEach(({ card1, card2, result }) => {
    it(`should check that ${
      card1 ? `{id: ${card1.id}, idx: ${card1.idx}}` : 'null'
    } and ${card2 ? `{id: ${card2.id}, idx: ${card2.idx}}` : 'null'} are ${
      result ? '' : 'not'
    } equal`, () => {
      if (result) {
        expect(isCard(card1)(card2)).to.equal(true)
        expect(isCard(card2)(card1)).to.equal(true)
      } else {
        expect(isCard(card1)(card2)).to.equal(false)
        expect(isCard(card2)(card1)).to.equal(false)
      }
    })
  })
})
