import s from './selectors'
const DECK_ID = '1n11n21i21n31n41n51n61n621n631n81n101n13'
const HAND = ['N1', 'N3', 'I2', 'N10']

describe('Dry-runner — Card Log', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should log a card when played', () => {
    cy.drPlay('N1')
    cy.get(s.CARD_LOG_IMAGE)
      .first()
      .should('have.attr', 'alt', 'Green Prototypes')
  })

  it('should log the second card played as such', () => {
    cy.drPlay('N3')
    cy.get(s.CARD_LOG_IMAGE)
      .first()
      .should('have.attr', 'alt', 'Gifted Recruits')
  })

  it('should not display more than 6 cards at once', () => {
    cy.drEndTurn().drPlay(0)
    cy.drEndTurn().drPlay(0)
    cy.drEndTurn().drPlay(0)
    cy.drEndTurn().drPlay(0)
    cy.drEndTurn().drPlay(0)
    cy.get(s.CARD_LOG_IMAGE).should('have.length', 6)
  })
})
