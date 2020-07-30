import s from '../selectors'

const DECK_ID = '5n15w15w25n35n45n55n65n625n665n445n485w19'

describe('Dry-runner — Archdruid Earyn', () => {
  beforeEach(() => cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`))

  it('should be possible to play spells with Archdruid Earyn', () => {
    cy.drDrawHand(['W1', 'N44', 'W19', 'N48'])
      .drEndTurn(4)

      .drPlay('N48')

      .get(s.MANA)
      .should('contain', 14)

      .get(s.CARD)
      .should('have.length', 1)
  })

  it('should not be possible to play Icicle Burst with Archdruid Earyn with no frozen enemies', () => {
    cy.drDrawHand(['W1', 'W2', 'W19', 'N48'])
      .drEndTurn(4)

      .drPlay('N48')
      .drPlay('W2')
      .drPlay('W1')
  })
})
