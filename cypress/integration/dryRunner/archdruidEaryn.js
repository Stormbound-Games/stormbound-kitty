import s from './selectors'

const DECK_ID =
  'NU4xLDVXMSw1VzIsNU4zLDVONCw1TjUsNU42LDVONjIsNU42Niw1TjQ0LDVONDgsNVcxOQ'

describe('Dry-runner — Archdruid Earyn', () => {
  beforeEach(() => cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`))

  it('should be possible to play spells with Archdruid Earyn', () => {
    const HAND = ['W1', 'N44', 'W19', 'N48']

    cy.drDrawHand(HAND)

      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()

      .drPlay('N48')

      .get(s.MANA)
      .should('contain', 13)

      .get(s.CARD)
      .should('have.length', 1)
  })

  it('should not be possible to play Icicle Burst with Archdruid Earyn with no frozen enemies', () => {
    const HAND = ['W1', 'W2', 'W19', 'N48']

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()

      .drPlay('N48')

      .drPlay('W2')

      .drPlay('W1')
  })
})
