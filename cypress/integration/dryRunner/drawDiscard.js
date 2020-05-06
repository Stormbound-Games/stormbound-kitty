import s from './selectors'

const DRAW_AND_DISCARD_DECK_ID = '5n15n25n35n235n45n65n625n635n675n125n145n22'
const DECK_ID = '5n55n85n125n145n165n195n225n305w95w165n425n72'

describe('Dry-runner — Draw and Discard', () => {
  it('should be possible to draw/discard cards', () => {
    cy.visit(`/deck/${DRAW_AND_DISCARD_DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['N1', 'N12', 'N14', 'N22'])
      .drEndTurn(7)

      .drPlay('N22')

      .get(s.CARD)
      .should('have.length', 3)

      .drPlay('N12')

      .get(s.CARD)
      .should('have.length', 1)

      .drPlay('N14')

      .get(s.CARD)
      .should('have.length', 2)

      .drCycle(0)
  })
  ;[
    { name: 'Frozen Core', id: 'W9' },
    { name: 'Dawnsparks', id: 'W16' },
  ].forEach(({ name, id }) => {
    it(
      'should be not be possible to play ' + name + ' with First Mutineer',
      () => {
        cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
          .drDrawHand(['N12', id, 'N22', 'N5'])

          .drSetRNG('FRIENDLY')
          .drPlay('N12')

          .drEndTurn()

          .get(s.MANA)
          .should('contain', 4)
      }
    )
  })

  it('should be not be possible to play Collector Mirz with First Mutineer', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['N12', 'N8', 'N22', 'N5'])
      .drPlay('N12')

      .get(s.DECK_CARD)
      .should('have.length', 12)
  })
})
