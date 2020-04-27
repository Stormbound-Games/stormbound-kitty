import s from './selectors'
const DECK_ID =
  'MU4xLDFOMiwxSTIsMU4zLDFONCwxTjUsMU42LDFONjIsMU42MywxTjgsMU4xMCwxTjEz'
const HAND = ['N1', 'N3', 'I2', 'N10']

describe('Dry-runner — Card Log', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should log a card when played', () => {
    cy.drPlay('N1')
      .get(s.CARD_LOG_IMAGE)
      .first()
      .should('have.attr', 'alt')
      .then(altText => expect(altText).to.eq('Green Prototypes'))
  })

  it('should log the second card played as such', () => {
    cy.drPlay('N3')
      .get(s.CARD_LOG_IMAGE)
      .first()
      .should('have.attr', 'alt')
      .then(altText => expect(altText).to.eq('Gifted Recruits'))
  })

  it('should not display more than 6 cards at once', () => {
    cy.drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)

      .get(s.CARD_LOG_IMAGE)
      .should('have.length', 6)
  })
})
