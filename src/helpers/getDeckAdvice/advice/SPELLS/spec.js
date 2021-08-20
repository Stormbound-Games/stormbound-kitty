import advice from './'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import serialisation from '~/helpers/serialisation'
import modifyDeck from '~/helpers/modifyDeck'

const getCards = (id, modifier = 'NONE') =>
  modifyDeck(serialisation.deck.deserialise(id), modifier).map(
    getResolvedCardData
  )

describe('The `SPELLS` advice', () => {
  it('should be returned if the deck has more than 2 spells', () => {
    const cards = getCards('1w11n21n631n231n151n91n211n291n311n401n441n50')
    expect(advice(cards)).not.toEqual(null)
  })

  it('should not be returned if the deck has less than 3 spells', () => {
    const cards = getCards('1n15f85f45f15f25f35n35f135f145f155n405n52')
    expect(advice(cards)).toEqual(null)
  })

  it('should not be returned if there is a spell brawl modifier', () => {
    const cards = getCards('5n12f85n25f45f35n32n675n95n154f104n402n76')
    expect(advice(cards, 'SPELL_MANA')).toEqual(null)
  })

  it('should not count Gift of the Wise', () => {
    const cards = getCards('5w25n35n95n115n145n164w64w93n693w163w194w21')
    expect(advice(cards, 'SPELL_MANA')).toEqual(null)
  })

  it('should not be returned with Archdruid Earyn and 5 spells', () => {
    const cards = getCards('1n11w11n21n31n41n51n61n621n631n231n151n48')
    expect(advice(cards, 'SPELL_MANA')).toEqual(null)
  })
})
