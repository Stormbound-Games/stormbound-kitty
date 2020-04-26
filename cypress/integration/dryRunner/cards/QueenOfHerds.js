const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVONjMsNU42Nyw1UzMsNVMyMQ=='
const HAND = ['S21', 'N1', 'N2', 'N3']

describe('Dry-runner — Queen of Herds', () => {
  it('should be possible to play satyrs with Queen of Herds', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)

      .drEndTurn(6)

      .drSetRNG('FRIENDLY')

      .drPlay('S21')
      .drPlay('S3')
  })
})
