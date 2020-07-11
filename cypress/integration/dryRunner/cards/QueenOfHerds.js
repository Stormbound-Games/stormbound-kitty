import s from '../selectors'

const DECK_ID = '5n15n25n35n235n45n55n65n625n635n675s35s21'

describe('Dry-runner — Queen of Herds', () => {
  it('should be possible to play satyrs with Queen of Herds', () => {
    const HAND = ['S21', 'N1', 'N2', 'N3']
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)

      .drEndTurn(7)

      .drSetRNG('FRIENDLY')

      .drPlay('S21')
      .drPlay('S3')

      .get(s.CARD_LOG_IMAGE)
      .should('have.length', 4)
  })

  it('should not be possible to play satyrs from the hand with Queen of Herds', () => {
    const HAND = ['S21', 'N1', 'N2', 'S3']
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)
      .drEndTurn(7)
      .drSetRNG('FRIENDLY')

      .drPlay('S21')

      .get(s.CARD)
      .should('have.length', 3)

      .get(s.CARD_LOG_IMAGE)
      .should('have.length', 2)
  })
})
