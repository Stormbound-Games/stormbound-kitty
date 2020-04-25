import s from '../selectors'

const DECK_ID =
  'NU4xLDVOMyw1TjIzLDVONCw1TjUsNU42LDVONjIsNU42Myw1TjY3LDVONjYsNU43LDVOOA=='
const HAND = ['N8', 'N1', 'N4', 'N3']

describe('Dry-runner — Collector Mirz', () => {
  it('should be possible to get tokens with Collector Mirz', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)

      .drEndTurn()

      .drPlay('N8')

      .get(s.DECK_CARD)
      .should('have.length', 12)
  })
})
