import s from './selectors'

const MANA_DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVOMTQsNVcxMiw1VzEwLDRXMTk'

describe('Dry-runner — Gain and Spend mana', () => {
  it('should be possible to gain/spend mana', () => {
    const HAND = ['N14', 'W10', 'W12', 'W19']

    cy.visit(`/deck/${MANA_DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()

      .drPlay('W19')

      .get(s.MANA)
      .should('contain', 12)

      .drPlay('W12')

      .get(s.MANA)
      .should('contain', 10)

      .drPlay('W10')

      .get(s.MANA)
      .should('contain', 0)
  })
})
