import s from '../selectors'

const DECK_ID =
  'NU4xLDVOMyw1TjIzLDVONCw1TjUsNU42LDVONjIsNU42Myw1TjY3LDVONjYsNU43LDVOOA=='
const HAND = ['N8', 'N1', 'N4', 'N3']

describe('Dry-runner — Collector Mirz', () => {
  it('should be possible to get tokens with Collector Mirz', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)

      .drPlay('N8')

      .get(s.DECK_CARD)
      .should('have.length', 13)
      .then($cards => {
        const tokens = $cards.filter((index, $card) => {
          const id = $card.getAttribute('data-testid')
          return id.slice(0, 1) === 'T' && id.slice(1, 3) !== '12'
        })
        expect(tokens).to.have.length(1)
      })
  })
})
