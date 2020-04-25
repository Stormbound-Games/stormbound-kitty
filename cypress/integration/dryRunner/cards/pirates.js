import s from '../selectors'

const DRAW_AND_DISCARD_DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU42LDVONjIsNU42Myw1TjY3LDVOMTIsNU4xNCw1TjIy'
const SNAKE_EYES_DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVONjMsNU42Nyw1TjY2LDVOMzM'

describe('Dry-runner — Pirates', () => {
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

  it('should be possible to discard the whole hand with Snake Eyes', () => {
    cy.visit(`/deck/${SNAKE_EYES_DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['N1', 'N2', 'N3', 'N33'])
      .drEndTurn(2)

      .drPlay('N33')

      .get(s.CARD)
      .should('have.length', 4)
  })

  it('should not be possible to discard whole hand with Snake Eyes if hand is not full', () => {
    cy.visit(`/deck/${SNAKE_EYES_DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['N1', 'N2', 'N3', 'N33'])
      .drEndTurn(4)

      .drPlay('N1')

      .drPlay('N33')

      .get(s.CARD)
      .should('have.length', 2)

      .drPlay('N2')
      .drCycle('N3')
  })
})
