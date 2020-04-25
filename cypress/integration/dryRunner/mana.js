import s from './selectors'

const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVOMTQsNVcxMiw1VzEwLDRXMTk'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe('Dry-runner — Mana', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should start a game with 3 mana', () => {
    cy.get(s.MANA).should('contain', 3)
  })

  it('should be possible to gain/spend mana', () => {
    cy.drEndTurn(4)

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
