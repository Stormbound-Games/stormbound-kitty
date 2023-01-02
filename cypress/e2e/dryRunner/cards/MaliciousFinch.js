import s from '../selectors'

const DECK_ID = '5xn1n2s1n3n23n4n5n6n62n67n63s21'

describe('Dry-runner — Malicious Finch', () => {
  it('should be possible to force Malicious Finch for the opponent', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run`)
    cy.get(s.OPPONENT_FINCH_CHECKBOX).check()
    cy.get(s.RNG_SETTINGS).should('be.visible')
    cy.drSetRNG('UNFRIENDLY')
    // This is a little ugly: we just want to make sure the opponent Malicious
    // Finch creates cards in the deck, but it’s not a guarantee, even with
    // unfriendly RNG. So we skip a few turns and hope for the best. This means
    // it _could_ fail if no card creation occurred within X turns.
    cy.drEndTurn(12)
    cy.get(s.DECK_CARD).should('not.have.length', 12)
  })
})
