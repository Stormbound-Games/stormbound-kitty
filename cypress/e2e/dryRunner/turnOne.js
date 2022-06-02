import s from './selectors'

const DECK_ID = '5n15n25n35n235n45n55n65n625n635s105n95n15'
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
      cy.get(s.PLAY_BTN).should('be.disabled')
      cy.drEndTurn()
      cy.drPlay(id)
    })
  })
})
