import s from '../selectors'

const DECK_ID = '5n15f85n25f45n35n235n45n55n65n625n635i5'

describe('Dry-runner — Rain of Frogs', () => {
  // Technically still valid but with RoF costing 3 mana instead of 2, the test
  // doesn’t make much sense any more.
  it.skip('should not be possible to play a unit or a structure after Rain of Frogs fills the board', () => {
    const HAND = ['N2', 'I5', 'N3', 'F8']

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drPlay('F8')
    cy.drSelect('I5')
    cy.get(s.PLAY_BTN).should('be.disabled')
    cy.drSelect('N3')
    cy.get(s.PLAY_BTN).should('be.disabled')
    cy.drPlay('N2')
  })
})
