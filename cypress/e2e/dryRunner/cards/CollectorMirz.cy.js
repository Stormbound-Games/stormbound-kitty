import s from '../selectors'

const DECK_ID = '5n15n35n235n45n55n65n625n635n675n665n75n8'
const HAND = ['N8', 'N1', 'N4', 'N3']

describe('Dry-runner — Collector Mirz', () => {
  it('should be possible to get tokens with Collector Mirz', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drPlay('N8')
    cy.get(s.DECK_CARD)
      .should('have.length', 13)
      .then($cards => {
        const tokens = $cards.filter((index, $card) => {
          const [id] = $card.getAttribute('data-testid').split('_')
          const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15].map(
            id => 'T' + id
          )

          return ids.includes(id)
        })
        expect(tokens).to.have.length(1)
      })
  })
})
