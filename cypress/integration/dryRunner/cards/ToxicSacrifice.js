import s from '../selectors'

const DECK_ID = '5n15f85n25f45n395n405n425n435n445n575n555n56'
const HAND = ['N2', 'N1', 'F8', 'F4']

describe('Dry-runner — Toxic Sacrifice', () => {
  beforeEach(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })
  ;[
    { id: 'N2', name: 'Summon Militia', action: 'spawn' },
    { id: 'N1', name: 'Green Prototypes', action: 'play' },
  ].forEach(({ id, name, action }) => {
    it(`should not be possible to play Toxic Sacrifice without ${action}ing a unit before, with ${name} for example`, () => {
      cy.drSelect('F4')
      cy.get(s.PLAY_BTN).should('be.disabled')
      cy.drPlay(id)
      cy.drPlay('F4')
    })
  })
})
