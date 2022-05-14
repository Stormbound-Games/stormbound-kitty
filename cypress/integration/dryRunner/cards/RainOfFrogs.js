import s from '../selectors'

const DECK_ID = '5n15f85n25f45n35n235n45n55n65n625n635i5'

describe('Dry-runner — Rain of Frogs', () => {
  it('should not be possible to play a unit or a structure after Rain of Frogs fills the board', () => {
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

  // Technically still valid, but with Toxic Sacrifice costing 2 mana instead of
  // 1, it is no longer possible to play it alongside 2 cards as first turn
  // (given first turn means 3 mana in the dry-runner).
  it.skip('should only be possible to play Green Prototypes after Rain of Frogs if Toxic Sacrifice was played in-between', () => {
    const HAND = ['N1', 'N2', 'F4', 'F8']

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drPlay('F8')
    cy.drSelect('N1')
    cy.get(s.PLAY_BTN).should('be.disabled')
    cy.drPlay('F4')
    cy.drPlay('N1')
  })
})
