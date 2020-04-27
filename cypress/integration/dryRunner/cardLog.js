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
      .get(s.CARD_LOG)
      .get('[class="DryRunnerCardLog__image"]')
      .first()
      .should('have.attr', 'alt')
      .then(altText => expect(altText).to.eq('Green Prototypes'))

      .drPlay('N3')
      .get('[class="DryRunnerCardLog__image"]')
      .first()
      .should('have.attr', 'alt')
      .then(altText => expect(altText).to.eq('Gifted Recruits'))

      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)
      .drEndTurn()
      .drPlay(0)

      .get('[class="DryRunnerCardLog__image"]')
      .should('have.length', 6)
  })
})
