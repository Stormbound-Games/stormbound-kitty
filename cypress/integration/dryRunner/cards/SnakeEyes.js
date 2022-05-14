import s from '../selectors'

const DECK_ID = '5n15n25n35n235n45n55n65n625n635n675n665n33'
const HAND = ['N1', 'N2', 'N3', 'N33']

describe('Dry-runner — Snake Eyes', () => {
  beforeEach(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should be possible to discard the whole hand with Snake Eyes', () => {
    cy.drEndTurn(2)
    cy.drPlay('N33')
    cy.get(s.CARD).should('have.length', 4)
  })

  it('should not be possible to discard whole hand with Snake Eyes if hand is not full', () => {
    cy.drEndTurn(4)
    cy.drPlay('N1')
    cy.drPlay('N33')
    cy.get(s.CARD).should('have.length', 2)
    cy.drPlay('N2')
    cy.drCycle('N3')
  })
})
