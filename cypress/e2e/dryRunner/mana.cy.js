import s from './selectors'

const DECK_ID = '5n15n25n35n235n45n55n65n625n145w125w104w19'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe('Dry-runner — Mana', () => {
  it('should be possible to gain/spend mana', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
    cy.get(s.MANA).should('contain', 3)
    cy.drEndTurn(6)
    cy.drPlay('W19')
    cy.get(s.MANA).should('contain', 13)
    cy.drPlay('W12')
    cy.get(s.MANA).should('contain', 11)
    cy.drPlay('W10')
    cy.get(s.MANA).should('contain', 0)
  })
})
