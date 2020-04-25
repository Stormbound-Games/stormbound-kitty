import s from '../selectors'

const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVONjMsNU42Nyw1TjY2LDVONw'
const HAND = ['N1', 'N2', 'N3', 'N63']

describe('Dry-runner — Unhealthy Hysteria', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should not be possible to play Unhealthy Hysteria before turn 2', () => {
    cy.drSelect('N63')
      .get(s.PLAY_BTN)
      .should('be.disabled')

      .drEndTurn()

      .drPlay('N63')
  })
})
