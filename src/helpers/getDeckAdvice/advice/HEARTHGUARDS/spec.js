import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialization from '~/helpers/serialization'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(
    global.__CARDS_INDEX__,
    serialization.deck.deserialize(global.__CARDS_INDEX_BY_SID__, id),
    modifier
  ).map(card => getResolvedCardData(global.__CARDS_INDEX__, card))

describe('The `HEARTHGUARDS` advice', () => {
  it('should not be returned if it doesn’t have Hearthguards', () => {
    const cards = getCards('5n15f45f15f25f35f255f85f105f115f125f135f17')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has at least 2 structures', () => {
    const cards = getCards('5n15n25i15n35n65i55n135i75n185i135i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has at least 1 structure and Rockworkers', () => {
    const cards = getCards('1xn1w1n2n66w2n3w4w7w13n34n39w17')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if it has a cheap structure', () => {
    const cards = getCards('5n15n25i15n31n45n65i55i75n185i135i205n39')
    expect(advice(cards)).toEqual(null)
  })

  it('should be returned if there are not enough structures', () => {
    const cards = getCards('1n11i11i21n671n661n641n651i161i171n341n391n68')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should be returned if there are not enough structures, including Rockworkers', () => {
    const cards = getCards('1xn1w1n2n66w2n3w4w7w28w13n39w17')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if there is a cheap structure', () => {
    const cards = getCards('1n11i11i21n671n661n131n641n651i161i171n391n68')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if there are several structures', () => {
    const cards = getCards('1n11n661i11i24i51n671n651i161i171n344n391n45')
    expect(advice(cards)).toEqual(null)
  })

  it('should suggest Twilight Prowlers if it is not in the deck', () => {
    const cards = getCards('1n11n21n661i11i21n671n641n651i161i171n341n39')
    expect(advice(cards).description).toContain('Twilight Prowlers')
  })

  it('should not suggest Twilight Prowlers if it is already in the deck', () => {
    const cards = getCards('1n11n21n661i11i21n641n651i161i171n341n391n68')
    expect(advice(cards).description).not.toContain('Twilight Prowlers.')
  })
})
