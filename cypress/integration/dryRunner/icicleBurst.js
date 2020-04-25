import s from './selectors'

const DECK_ID =
  'NU4xLDRXMSw1TjIsNVcyLDVOMyw1TjQsNE41LDRONiwyTjYyLDJONjMsM1cxMSw0VzY='
const ZHEVANA_DECK_ID =
  'NU4xLDVXMSw1TjIsNVcyLDVOMyw1TjIzLDVONCw1TjUsNVc0LDVXMTEsNVc4LDVXNg'

describe('Dry-runner — Icicle Burst', () => {
  ;[
    { id: 'W2', name: 'Frosthexers' },
    { id: 'W11', name: 'Midwinter Chaos' },
    { id: 'W6', name: 'Moment’s Peace' },
  ].forEach(({ id, name }) => {
    it(
      'should not be possible to play Icicle Burst without playing a card like ' +
        name,
      () => {
        cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
          .drDrawHand(['N1', 'N2', 'W1', id])

          .drEndTurn()
          .drEndTurn()
          .drEndTurn()

          .drSelect('W1')
          .get(s.PLAY_BTN)
          .should('be.disabled')

          .drPlay(id)
          .drPlay('W1')
      }
    )
  })

  it('should not be possible to play Icicle Burst after clearing the board of frozen enemies', () => {
    cy.visit(`/deck/${ZHEVANA_DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['W1', 'W4', 'W6', 'W8'])

      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()

      .drPlay('W6')
      .drPlay('W8')
      .drPlay('W4')

      .drSelect('W1')
      .get(s.PLAY_BTN)
      .should('be.disabled')
  })

  it('should not be possible to play Icicle Burst on turn 1', () => {
    const HAND = ['N1', 'N2', 'N3', 'W1']

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drSelect('W1')
      .get(s.PLAY_BTN)
      .should('be.disabled')
  })
})
