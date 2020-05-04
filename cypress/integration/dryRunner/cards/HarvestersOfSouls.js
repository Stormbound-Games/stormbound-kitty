import s from '../selectors'

const DECK_ID =
  'NU4xLDVOMyw1TjIzLDVONCw1TjUsNU42LDVONjIsNU42Myw1TjY3LDVONjYsNU43LDVOMzg='
const DECK_HOS_LEVEL_1 =
  'NU4xLDVOMyw1TjIzLDVONCw1TjUsNU42LDVONjIsNU42Myw1TjY3LDVONjYsNU43LDFOMzg='
const HAND = ['N38', 'N1', 'N4', 'N3']

describe('Dry-runner — Harvesters of Souls', () => {
  it('should be possible to add new cards to deck with Harvesters of Souls', () => {
    const isCard = card1 => card2 =>
      card1.getAttribute('data-testid') === card2.getAttribute('data-testid')

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)

      .get(s.DECK_CARD)

      .then($cards => {
        const cards = Array.from($cards)
        cy.drEndTurn(3)
          .drPlay('N38')

          .get(s.DECK_CARD)
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
      .drDrawHand(HAND)

      .drEndTurn(3)
      .drSetRNG('UNFRIENDLY')
      .drPlay('N38')

      .get(s.DECK_CARD)
      .should('have.length', 12)
  })

  it('should be possible to add new level 1 cards to deck with Harvesters of Souls in equals mode', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drReset({ equals: true })
      .drDrawHand(HAND)

      .drEndTurn(3)
      .drSetRNG('FRIENDLY')
      .drPlay('N38')

      .get(s.DECK_CARD)
      .should('have.length', 13)
      .find('.Deck__level')
      .should('contain', 1)
  })
})
