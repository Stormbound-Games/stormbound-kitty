import s from './selectors'

const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVONjMsNVMxMCw1TjksNU4xNQ=='
const HAND = ['N9', 'N15', 'N63', 'S10']

describe('Dry-runner — Turn one', () => {
  beforeEach(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })
  ;[
    { name: 'Confinement', id: 'N9' },
    { name: 'Potion of Growth', id: 'N15' },
    { name: 'Unhealthy Hysteria', id: 'N63' },
    { name: 'Broken Truce', id: 'S10' },
  ].forEach(({ name, id }) => {
    it(`should not be possible to play ${name} before turn 2`, () => {
      cy.drSelect(id)
        .get(s.PLAY_BTN)
        .should('be.disabled')

        .drEndTurn()

        .drPlay(id)
    })
  })
})
