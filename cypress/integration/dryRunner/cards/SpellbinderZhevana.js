import s from '../selectors'

const DECK_ID = '5n15w15n25w25n35n235n45n55w45w115w85w6'
const HAND = ['W1', 'W2', 'W6', 'W8']

describe('Dry-runner — Spellbinder Zhevana', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should be possible to get mana from Spellbinder Zhevana', () => {
    cy.drEndTurn(3)

      .drPlay('W2')
      .drPlay('W8')

      .get(s.MANA)
      .should('contain', 4)
  })
})
