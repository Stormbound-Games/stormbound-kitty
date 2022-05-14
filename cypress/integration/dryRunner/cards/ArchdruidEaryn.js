import s from '../selectors'

const DECK_ID = '5xn1w1n66w2n3n4n5n6n29n44n48w19'

describe('Dry-runner — Archdruid Earyn', () => {
  beforeEach(() => cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`))

  it('should be possible to play spells with Archdruid Earyn', () => {
    cy.drDrawHand(['N1', 'N44', 'N29', 'N48'])
    cy.drEndTurn(4)
    cy.drPlay('N48')
    cy.get(s.MANA).should('contain', 0)
    cy.get(s.CARD).should('have.length', 1)
  })

  it('should not be able to play Gift of the Wise', () => {
    cy.drDrawHand(['N1', 'N44', 'W19', 'N48'])
    cy.drEndTurn(4)
    cy.drPlay('N48')
    cy.get(s.MANA).should('contain', 0)
    cy.get(s.CARD).should('have.length', 2)
  })
})
