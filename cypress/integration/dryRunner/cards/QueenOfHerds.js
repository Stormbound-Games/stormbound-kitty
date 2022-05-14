import s from '../selectors'

const DECK_ID = '5xn1n2s1n3n23n4n5n6n62n67n63s21'

describe('Dry-runner — Queen of Herds', () => {
  it('should be possible to play satyrs with Queen of Herds', () => {
    const HAND = ['S21', 'N1', 'N2', 'N3']
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drEndTurn(7)
    cy.drPlay('S21')
    cy.get(s.CARD_LOG_IMAGE).should('have.length', 3)
  })

  it('should not be possible to play satyrs from the hand with Queen of Herds', () => {
    const HAND = ['S21', 'N1', 'N2', 'S1']
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drEndTurn(7)
    cy.drPlay('S21')
    cy.get(s.CARD).should('have.length', 3)
    cy.get(s.CARD_LOG_IMAGE).should('have.length', 2)
  })
})
