import s from './selectors'

const DECK_ID =
  'NU41LDVOOCw1TjEyLDVOMTQsNU4xNiw1TjE5LDVOMjIsNU4zMCw1VzksNVcxNiw1TjQyLDVONzI='

describe('Dry-runner — Don’t play discarded cards', () => {
  beforeEach(() => cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`))
  ;[
    { name: 'Frozen Core', id: 'W9' },
    { name: 'Dawnsparks', id: 'W16' },
  ].forEach(({ name, id }) => {
    it(
      'should be not be possible to play ' + name + ' with First Mutineer',
      () => {
        cy.drDrawHand(['N12', id, 'N22', 'N5'])

          .drSetRNG('FRIENDLY')
          .drPlay('N12')

          .drEndTurn()

          .get(s.MANA)
          .should('contain', 4)
      }
    )
  })

  it('should be not be possible to play Collector Mirz with First Mutineer', () => {
    cy.drDrawHand(['N12', 'N8', 'N22', 'N5'])
      .drPlay('N12')

      .get(s.DECK_CARD)
      .should('have.length', 12)
  })
})
