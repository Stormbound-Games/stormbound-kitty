import s from '../selectors'

const DECK_ID = '5n15n35n235n45n55n65n625n635n675n665n75n38'
const DECK_HOS_LEVEL_1 = '5n15n35n235n45n55n65n625n635n675n665n71n38'
const HAND = ['N38', 'N1', 'N4', 'N3']

describe('Dry-runner — Harvesters of Souls', () => {
  it('should be possible to add new cards to deck with Harvesters of Souls', () => {
    const isCard = card1 => card2 =>
      card1.getAttribute('data-testid') === card2.getAttribute('data-testid')

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.get(s.DECK_CARD).then($cards => {
      const cards = Array.from($cards)

      cy.drEndTurn(3)
      cy.drSetRNG('FRIENDLY')
      cy.drPlay('N38')
      cy.get(s.HOS_FIRST_SUGGESTED).click()
      cy.get(s.DECK_CARD)
        .should('have.length', 13)
        .then($newCards => {
          const addedCards = Array.from($newCards).filter(
            card => !cards.find(isCard(card))
          )
          expect(addedCards).to.have.length(1)
        })
    })
  })

  it('should not be possible to add new cards to deck with level 1 Harvesters of Souls with Unfriendly RNG', () => {
    cy.visit(`/deck/${DECK_HOS_LEVEL_1}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drEndTurn(3)
    cy.drSetRNG('UNFRIENDLY')
    cy.drPlay('N38')
    cy.get(s.HOS_FIRST_SUGGESTED).should('not.exist')
    cy.get(s.DECK_CARD).should('have.length', 12)
  })

  it('should be possible to add new level 1 cards to deck with Harvesters of Souls in equals mode', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drReset({ equals: true })
    cy.drDrawHand(HAND)
    cy.drEndTurn(3)
    cy.drSetRNG('FRIENDLY')
    cy.drPlay('N38')
    cy.get(s.HOS_FIRST_SUGGESTED).click()
    cy.get(s.DECK_CARD)
      .should('have.length', 13)
      .find(s.DECK_CARD_LEVEL)
      .each($card => expect($card[0].innerText).to.contain(1))
  })
})
