import s from '../selectors'

const DECK_ID =
  'NU4xLDVOMyw1TjIzLDVONCw1TjUsNU42LDVONjIsNU42Myw1TjY3LDVONjYsNU43LDVOMzg='
const HAND = ['N38', 'N1', 'N4', 'N3']

describe('Dry-runner — Harvesters of Souls', () => {
  it('should be possible to add new cards to deck with Harvesters of Souls', () => {
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
              card =>
                !cards.find(
                  c =>
                    c.getAttribute('data-testid') ===
                    card.getAttribute('data-testid')
                )
            )
            expect(addedCards).to.have.length(1)
          })
      })
  })

  it('should be possible to add new level 1 cards to deck with Harvesters of Souls in equals mode', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drReset({ equals: true })
      .drDrawHand(HAND)

      .drEndTurn(3)
      .drPlay('N38')

      .get(s.DECK_CARD)
      .find('.Deck__level')
      .should('contain', 1)
  })
})
