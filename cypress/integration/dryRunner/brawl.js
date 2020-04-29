import s from './selectors'

const KNIGHTS_DECK =
  'MU4xLDFOMiwxTjMsMU43LDFONTksMU4yNywxTjI4LDFOMzIsMU40NywxTjU0LDFONTUsMU41Ng'
const STRUCTURES_DECK =
  'MUk1LDFOMTMsMVczLDFJMTAsMU4yMCwxSTE0LDFXMjQsMUYxMywxVzksMUkxOSwxTjM0LDFONDU'

describe('Dry-runner — Brawl', () => {
  it('should be able to reset a game with knight mana cost modifier', () => {
    cy.visit(`/deck/${KNIGHTS_DECK}/dry-run`)

      .get(s.DECK_CARD)
      .find(s.MANA_COST)
      .then($cards => {
        const deckCost = Array.from($cards).reduce(
          (acc, $card) => acc + parseInt($card.innerText),
          0
        )

        cy.drReset({ modifier: 'KNIGHT_MANA' })

          .get(s.DECK_CARD)
          .find(s.MANA_COST)
          .then($cards => {
            const newDeckCost = Array.from($cards).reduce(
              (acc, $card) => acc + parseInt($card.innerText),
              0
            )
            expect(newDeckCost).to.eq(deckCost - 20)
          })
      })
  })

  it('should be able to reset a game with structure mana cost modifier', () => {
    cy.visit(`/deck/${STRUCTURES_DECK}/dry-run`)

      .get(s.DECK_CARD)
      .find(s.MANA_COST)
      .then($cards => {
        const deckCost = Array.from($cards).reduce(
          (acc, $card) => acc + parseInt($card.innerText),
          0
        )

        cy.drReset({ modifier: 'STRUCTURE_MANA' })

          .get(s.DECK_CARD)
          .find(s.MANA_COST)
          .then($cards => {
            const newDeckCost = Array.from($cards).reduce(
              (acc, $card) => acc + parseInt($card.innerText),
              0
            )
            expect(newDeckCost).to.eq(deckCost - 24)
          })
      })
  })
})
