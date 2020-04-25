import s from './selectors'

const TOXIC_SACRIFICE_DECK_ID =
  'NUY4LDVOMiw1RjQsNU4zLDVOMzksNU40MCw1TjQyLDVONDMsNU40NCw1TjU1LDVONTYsNU41Nw'

describe('Dry-runner — Toxic Sacrifice', () => {
  ;[
    { id: 'N2', name: 'Summon Militia', action: 'spawn' },
    { id: 'N3', name: 'Gifted Recruits', action: 'play' },
    { id: 'F8', name: 'Rain of Frogs', action: 'spawn' },
  ].forEach(({ id, name, action }) => {
    it(
      'should not be possible to play Toxic Sacrifice without ' +
        action +
        'ing a unit before, with ' +
        name +
        ' for example',
      () => {
        const HAND = ['N2', 'N3', 'F8', 'F4']

        cy.visit(`/deck/${TOXIC_SACRIFICE_DECK_ID}/dry-run?mode=MANUAL`)

          .drDrawHand(HAND)

          .drSelect('F4')
          .get(s.DR_PLAY_BTN)
          .should('be.disabled')

          .drPlay(id)

          .drPlay('F4')
      }
    )
  })
})
