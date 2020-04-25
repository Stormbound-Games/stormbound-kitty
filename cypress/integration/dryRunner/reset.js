import s from './selectors'

const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVOMTQsNVcxMiw1VzEwLDRXMTk'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe.skip('Dry-runner — Reset', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should be able to reset a game', () => {})

  it('should be able to reset a game in equals mode', () => {})
})
