import s from './selectors'

const KNIGHTS_DECK = '1n11n21n31n71n591n271n281n321n471n541n551n56'
const STRUCTURES_DECK = '1i51n131w31i101n201i141w241f131w91i191n341n45'

describe('Dry-runner — Brawl', () => {
  it('should be able to reset a game with knight mana cost modifier', () => {
    cy.visit(`/deck/${KNIGHTS_DECK}/dry-run`)
    cy.get(s.DECK_CARD)
      .find(s.MANA_COST)
      .then($cards => {
        const deckCost = Array.from($cards).reduce(
          (acc, $card) => acc + parseInt($card.innerText),
          0
        )

        cy.drReset({ modifier: 'KNIGHT_MANA' })
        cy.get(s.DECK_CARD)
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
    cy.get(s.DECK_CARD)
      .find(s.MANA_COST)
      .then($cards => {
        const deckCost = Array.from($cards).reduce(
          (acc, $card) => acc + parseInt($card.innerText),
          0
        )

        cy.drReset({ modifier: 'STRUCTURE_MANA' })
        cy.get(s.DECK_CARD)
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
